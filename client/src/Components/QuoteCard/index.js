import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";
import { style } from '../../Utils';

const { medias } = style;

const QuoteCardContainer = styled.div`
    margin: 0 20px;
    width: 175px;
    @media only screen and (min-width: ${medias.xlg}px) {
        width: 300px;
    }
`;

const QuoteCardHeader = styled.div`
    h2, h5 {
        margin: 0;
        text-align: center;
    }
    @media only screen and (min-width: ${medias.xlg}px) {
        h2 {
            font-size: 50px;
        }
        h5 {
            font-size: 30px;
        }
    }
`;

const QuoteCardBody = styled.div`
    font-size: 9pt;
    @media only screen and (min-width: ${medias.xlg}px) {
        font-size: 15pt;
    }
`;

const QuoteCardListItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const QuoteCard = ({subtitle, history = []}) => {
    return <QuoteCardContainer>
        <QuoteCardHeader>
            <h2>${history.length ? history[history.length - 1].prettyPrice : "0.00"}</h2>
            <h5>{subtitle}</h5>
        </QuoteCardHeader>
        <QuoteCardBody>
            {history.reverse().map(quote => (<QuoteCardListItem key={uuidv4()}>
                <div>
                    {quote.time}
                </div>
                <div>
                    ${quote.prettyPrice}
                </div>
            </QuoteCardListItem>))}
        </QuoteCardBody>
    </QuoteCardContainer>;
}

export default QuoteCard;