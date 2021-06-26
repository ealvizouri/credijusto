import React from 'react';
import styled, { css } from 'styled-components';
import { style } from "../../Utils";

const { medias } = style;

const FormItemContainer = styled.div`
    margin: 10px;
    width: 100%;
    text-align: left;
    ${props => props.rightAligned && css`
        text-align: right;
    `}
`;

const Label = styled.label`
    margin: 10px 0;
    display: inline-block;
    width: 100%;
    text-align: inherit;
`;

const ChildrenContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    ${props => props.rightAligned && css`
        justify-content: flex-end;
    `}
    @media only screen and (min-width: ${medias.md}px) {
        flex-wrap: nowrap;
    }
`;

const FormItem = ({label, rightAligned = false, children}) => {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { doSomething: 'Yeah!' });
        }
        return child;
    });
    
    return (<FormItemContainer rightAligned={rightAligned}>
        {label ? <Label>{label}</Label> : null }
        <ChildrenContainer rightAligned={rightAligned}>
            {childrenWithProps}
        </ChildrenContainer>
    </FormItemContainer>);
}

export default FormItem;