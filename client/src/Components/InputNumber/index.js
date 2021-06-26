import React, { forwardRef } from 'react';
import Input from '../Input';
import { format } from '../../Utils';

const InputNumber = forwardRef((props, ref) => {
    return <Input
        ref={ref}
        formatter={format.commaNumber}
        {...props}
    />
});

export default InputNumber;