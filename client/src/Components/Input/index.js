import { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { style } from "../../Utils";

const { colors } = style;

const BeautyInput = styled.input`
    appearance: none;
    background-clip: padding-box;
    background-color: ${colors.white};
    border: 2px solid ${colors.gray};
    border-radius: .375rem;
    color: ${colors.bunting};
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
    &.form-item-error {
        border-color: red;
        border-width: 2px;
    }
`;

let selectionStart = 0;

const Input = forwardRef(function Input({ initialValue = '', name='', placeholder = '', style = {}, formatter = null, onChange = null }, ref) {
    const [value, setValue] = useState(initialValue);
    const hasFormatter = formatter && typeof formatter === 'function';

    const _onChange = (event) => {
        if (hasFormatter) {
            selectionStart = event.target.selectionStart;
            setValue(formatter(event.target.value));
        } else setValue(event.target.value);
        if (onChange) onChange(event.target.value);
    };

    useEffect(() => {
        if (hasFormatter && ref && ref.current) {
            ref.current.selectionStart = selectionStart;
            ref.current.selectionEnd = selectionStart;
        }
    }, [hasFormatter, value, ref]);

    return (<BeautyInput
        ref={ref}
        name={name}
        value={value}
        style={style}
        placeholder={placeholder}
        onChange={_onChange}
    />);
})

export default Input;