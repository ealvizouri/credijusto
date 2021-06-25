import React, { useState } from 'react';
import styled from 'styled-components';

const TabsWrapper = styled.div`
    margin: 10px 0 0;
    border: 1px solid rgb(221, 221, 221);
    display: flex;
    flex-direction: column;
    max-width: 500px;
`;
const TabsContainer = styled.div`
    display: flex;
    border-bottom: 1px solid rgb(221, 221, 221);
    span {
        border-right: 1px solid rgb(221, 221, 221);
        padding: 5px 10px;
        cursor: pointer;
        &.active {
            background-color: rgb(221, 221, 221);
        }
    }
`;
const TabsContent = styled.div`
`;

const Tabs = ({tabs, children}) => {
    const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : '');
    const tabContent = children.filter(c => c.props.symbol === activeTab);
    return <TabsWrapper>
        <TabsContainer>
            {tabs.map(tab => <span key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</span>)}
        </TabsContainer>
        <TabsContent>{tabContent}</TabsContent>
    </TabsWrapper>;
}

export default Tabs;