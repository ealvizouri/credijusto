import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { style } from "../../Utils";

const { colors } = style;

const TabsWrapper = styled.div`
    border: 1px solid ${colors.gray};
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const TabsContainer = styled.div`
    display: flex;
    border-bottom: 1px solid ${colors.gray};
    span {
        border-right: 1px solid ${colors.gray};
        padding: 5px 10px;
        cursor: pointer;
        &.active {
            background-color: ${colors.gray};
        }
    }
`;
const TabsContent = styled.div`
    padding: 10px;
`;

const Tabs = ({tabs, onClick, children}) => {
    const [activeTab, setActiveTab] = useState(tabs.length ? tabs[0] : '');
    const tabContent = children.filter(c => c.props.symbol === activeTab);
    const _onClick = useCallback((tab) => {
        setActiveTab(tab)
        if (onClick) onClick(tab);
    }, [onClick])
    return <TabsWrapper>
        <TabsContainer>
            {tabs.map(tab => <span key={tab} className={activeTab === tab ? "active" : ""} onClick={() => _onClick(tab)}>{tab}</span>)}
        </TabsContainer>
        <TabsContent>{tabContent}</TabsContent>
    </TabsWrapper>;
}

export default Tabs;