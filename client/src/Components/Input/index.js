import { useState, forwardRef } from 'react';
import styled from 'styled-components';

const BeautyInput = styled.input`
    appearance: none;
    background-clip: padding-box;
    background-color: #fff;
    border: 2px solid #d2ddec;
    border-radius: .375rem;
    color: #12263f;
    display: block;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.5;
    padding: .5rem .75rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-right: 10px;
    &:focus, &:focus-visible {
        outline: none;
    }
`;

const Input = forwardRef(function Input({ initialValue = '', name='', placeholder = '', width = "auto", formatter = null }, ref) {
    const [value, setValue] = useState(initialValue);

    const onChange = (event) => {
        if (formatter && typeof formatter === 'function') setValue(formatter(event.target.value));
        else setValue(event.target.value);
    };

    return (<BeautyInput
        ref={ref}
        name={name}
        value={value}
        style={{width}}
        placeholder={placeholder}
        onChange={onChange}
    />);
})

export default Input;