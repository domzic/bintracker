import React from 'react';

import {
    Group,
    Label,
    Input
} from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <Group>
       <Input>
            onChange={handleChange}
            ...otherProps
        </Input>
        {
            label ? 
            <Label>
                {label}
            </Label>
            : null
        }
    </Group>
)

export default FormInput;