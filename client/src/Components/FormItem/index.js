import React from 'react';
import styled, { css } from 'styled-components';

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
    ${props => props.rightAligned && css`
        justify-content: flex-end;
    `}
`;

const FormItem = ({label, rightAligned = false, children}) => {
    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { doSomething: 'Yeah!' });
        }
        return child;
    });
    // console.log(typeof childrenWithProps, childrenWithProps);
    
    return (<FormItemContainer rightAligned={rightAligned}>
        {label ? <Label>{label}</Label> : null }
        <ChildrenContainer rightAligned={rightAligned}>
            {childrenWithProps}
        </ChildrenContainer>
    </FormItemContainer>);
}

export default FormItem;