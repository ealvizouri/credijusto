import React, { useReducer, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import Header from '../../Components/Header';
import Tabs from '../../Components/Tabs';
import TabContent from '../../Components/TabContent';
import QuoteCard from '../../Components/QuoteCard';

import InputNumber from '../../Components/InputNumber';

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  padding: 20px;
`;

const formatNumber = function(value) {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const dateFormat = "YYYY-MM-DD HH:mm:ss";

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const newState = JSON.parse(JSON.stringify(state));
            Object.keys(action.payload).forEach(symbol => {
                const symbols = action.payload;
                if (symbols[symbol].cryptocompare) newState[symbol].cryptocompare.push(symbols[symbol].cryptocompare);
                if (symbols[symbol].stormgain) newState[symbol].stormgain.push(symbols[symbol].stormgain);
                if (symbols[symbol].coingecko) newState[symbol].coingecko.push(symbols[symbol].coingecko);
            });
            return newState;
        default: return state;
    }
}

const initialState = {
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
};

const Home = (props) => {
    const [data, dispatchData] = useReducer(reducer, initialState);
    const user = useSelector(state => state.user);
    const history = useHistory();
    const updateQuotes = useCallback(() => {
        Promise.all([
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD'),
            axios.get('https://public-api.stormgain.com/api/v1/ticker'),
            axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple'),
        ]).then(([cryptocompare, stormgain, coingecko]) => {
            // console.log(cryptocompare, stormgain, coingecko);
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
                            prettyPrice: formatNumber(cryptocompare.data[symbol].USD)
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
                            prettyPrice: formatNumber(lastPrice)
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
                            prettyPrice: formatNumber(item.current_price)
                        }
                    }
                })
            }
            dispatchData({type: "ADD", payload})
        }).catch(errors => {
            console.log(errors);
        });
    }, []);

    if (user.token === null) {
        history.push('/register');
    }

    useEffect(() => {
        updateQuotes();
        setInterval(updateQuotes, 15000);
    }, [updateQuotes]);

    return (<Content>
        <Header firstName={user.firstName} />
        <Body>
            <Tabs tabs={['BTC', 'ETH', 'XRP']}>
                {Object.keys(data).map(symbol => {
                    const item = data[symbol];
                    return <TabContent key={symbol} symbol={symbol}>
                        <QuoteCard key="cryptocompare" subtitle="cryptocompare" history={item.cryptocompare}></QuoteCard>
                        <QuoteCard key="stormgain" subtitle="stormgain" history={item.stormgain}></QuoteCard>
                        <QuoteCard key="coingecko" subtitle="coingecko" history={item.coingecko}></QuoteCard>
                    </TabContent>
                })}
            </Tabs>
            <InputNumber name="number" />
        </Body>
    </Content>)
}

export default Home;