import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";

const QuoteCardContainer = styled.div`
    width: 200px;
`;

const QuoteCardHeader = styled.div`
    h2, h5 {
        margin: 0;
        text-align: center;
    }
`;

const QuoteCardBody = styled.div`
    font-size: 9pt;
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