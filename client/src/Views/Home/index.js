import React, { useState, useReducer, useCallback, useEffect, createRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { format, style, exchanges } from '../../Utils';

import Header from '../../Components/Header';
import Tabs from '../../Components/Tabs';
import TabContent from '../../Components/TabContent';
import QuoteCard from '../../Components/QuoteCard';

import InputNumber from '../../Components/InputNumber';

const { medias, colors } = style;

const Content = styled.div`
    width: 100%;
    height: 100%;
`;

const Body = styled.div`
    padding: 0;
`;

const ConversionContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    input {
        width: calc(100% - 24px);
    }
    @media only screen and (min-width: ${medias.md}px) {
        input {
            width: 350px;
        }
    }
`;

const ConversionTag = styled.div`
    background-color: ${colors.primary};
    margin: 5px 0;
    border: 1px solid ${colors.primary};
    border-radius: 5px;
    color: ${colors.white};
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
    width: 100%;
    span {
        padding: 5px;
        display: block;
        height: 100%;
    }
    .exchange {
        text-transform: uppercase;
    }
    .value {
        background-color: ${colors.white};
        color: ${colors.darkGray};
        border: 1px solid ${colors.white};
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        text-overflow: ellipsis;
        max-width: 50%;
        overflow: hidden;
        white-space: nowrap;
    }
    @media only screen and (min-width: ${medias.md}px) {
        margin: 2px 0;
        font-size: 12pt;
        width: 378px;
    }
`;

const dateFormat = "YYYY-MM-DD HH:mm:ss";

function reducer(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'ADD':
            Object.keys(action.payload).forEach(symbol => {
                const symbols = action.payload;
                if (symbols[symbol].cryptocompare) {
                    if (newState.cryptos[symbol].cryptocompare.length > 10) {
                        newState.cryptos[symbol].cryptocompare.shift();
                    }
                    newState.cryptos[symbol].cryptocompare.push(symbols[symbol].cryptocompare);
                }
                if (symbols[symbol].stormgain) {
                    if (newState.cryptos[symbol].stormgain.length > 10) {
                        newState.cryptos[symbol].stormgain.shift();
                    }
                    newState.cryptos[symbol].stormgain.push(symbols[symbol].stormgain);
                }
                if (symbols[symbol].coingecko) {
                    if (newState.cryptos[symbol].coingecko.length > 10) {
                        newState.cryptos[symbol].coingecko.shift();
                    }
                    newState.cryptos[symbol].coingecko.push(symbols[symbol].coingecko);
                }
            });
            return newState;
        case 'SET_USD_MXN':
            newState.usdMxn = action.payload;
            return newState;
        default: return state;
    }
}

const initialState = {
    usdMxn: 20,
    cryptos: {
        BTC: {
            cryptocompare: [],
            stormgain: [],
            coingecko: []
        },
        ETH: {
            cryptocompare: [],
            stormgain: [],
            coingecko: []
        },
        XRP: {
            cryptocompare: [],
            stormgain: [],
            coingecko: []
        }
    }
};
const amountRef = createRef();

const Home = (props) => {
    const [data, dispatchData] = useReducer(reducer, initialState);
    const [currentCrytpo, setCurrentCrytpo] = useState("BTC");
    const [mxnValues, setMxnValues] = useState({});
    const user = useSelector(state => state.user);
    const history = useHistory();
    const getUsdMxn = useCallback(() => {
        axios.get('https://free.currconv.com/api/v7/convert?q=USD_MXN&compact=ultra&apiKey=bb4278a57c884c78d6eb')
            .then(({data}) => {
                if (data && data.USD_MXN) {
                    dispatchData({type: "SET_USD_MXN", payload: data.USD_MXN});
                }
            });
    }, []);
    const updateQuotes = useCallback(() => {
        Promise.all([
            axios.get(exchanges.cryptocompare),
            axios.get(exchanges.stormgain),
            axios.get(exchanges.coingecko),
        ]).then(([cryptocompare, stormgain, coingecko]) => {
            const payload = {
                BTC: {
                    cryptocompare: null,
                    stormgain: null,
                    coingecko: null
                },
                ETH: {
                    cryptocompare: null,
                    stormgain: null,
                    coingecko: null
                },
                XRP: {
                    cryptocompare: null,
                    stormgain: null,
                    coingecko: null
                }
            }
            if (cryptocompare && cryptocompare.data) {
                Object.keys(cryptocompare.data).forEach(symbol => {
                    symbol = symbol.toUpperCase();
                    if (payload.hasOwnProperty(symbol)) {
                        payload[symbol].cryptocompare = {
                            time: moment().format(dateFormat),
                            price: cryptocompare.data[symbol].USD,
                            prettyPrice: format.commaNumber(cryptocompare.data[symbol].USD)
                        }
                    }
                })
            }
            if (stormgain && stormgain.data) {
                Object.keys(stormgain.data).forEach(stormgainSymbol => {
                    stormgainSymbol = stormgainSymbol.toUpperCase();
                    const symbol = stormgainSymbol.split("_")[0];
                    if (payload.hasOwnProperty(symbol)) {
                        const lastPrice = parseFloat(stormgain.data[stormgainSymbol].last_price);
                        payload[symbol].stormgain = {
                            time: moment().format(dateFormat),
                            price: lastPrice,
                            prettyPrice: format.commaNumber(lastPrice)
                        }
                    }
                })
            }
            if (coingecko && coingecko.data) {
                coingecko.data.forEach(item => {
                    const symbol = item.symbol.toUpperCase();
                    if (payload.hasOwnProperty(symbol)) {
                        payload[symbol].coingecko = {
                            time: moment().format(dateFormat),
                            price: item.current_price,
                            prettyPrice: format.commaNumber(item.current_price)
                        }
                    }
                })
            }
            dispatchData({type: "ADD", payload});
        }).catch(errors => {
            console.log(errors);
        });
    }, []);

    if (user.token === null) {
        history.push('/register');
    }

    useEffect(() => {
        getUsdMxn();
        updateQuotes();
        setInterval(updateQuotes, 15000);
    }, [updateQuotes, getUsdMxn]);

    const calculateValues = useCallback((value) => {
        value = parseFloat(value.replaceAll(',', ''));
        if (isNaN(value)) return;
        const exchanges = data.cryptos[currentCrytpo];
        const values = {};
        Object.keys(exchanges).forEach(key => {
            if (exchanges[key].length) {
                values[key] = value / (data.usdMxn * exchanges[key][exchanges[key].length - 1].price);
            }
        });
        setMxnValues(values);
    }, [data, currentCrytpo]);

    useEffect(() => {
        calculateValues(amountRef.current.value);
    }, [currentCrytpo, calculateValues]);

    return (<Content>
        <Header firstName={user.firstName} />
        <Body>
            <Tabs tabs={Object.keys(data.cryptos)} onClick={setCurrentCrytpo}>
                {Object.keys(data.cryptos).map(symbol => {
                    const item = data.cryptos[symbol];
                    return <TabContent key={symbol} symbol={symbol}>
                        <QuoteCard key="cryptocompare" subtitle="cryptocompare" history={item.cryptocompare} />
                        <QuoteCard key="stormgain" subtitle="stormgain" history={item.stormgain} />
                        <QuoteCard key="coingecko" subtitle="coingecko" history={item.coingecko} />
                    </TabContent>
                })}
            </Tabs>
            <ConversionContainer>
                <span>Convert MXN&nbsp;</span>
                <InputNumber ref={amountRef} name="number" onChange={calculateValues} />
            </ConversionContainer>
            <ConversionContainer>
                {Object.keys(mxnValues).map(key => (<ConversionTag key={key}>
                    <span className="exchange">{key}</span>
                    <span className="value">{format.commaNumber(mxnValues[key])}</span>
                </ConversionTag>))}
            </ConversionContainer>
        </Body>
    </Content>)
}

export default Home;