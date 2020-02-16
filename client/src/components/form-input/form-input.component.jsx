import React from 'react';

import {
    Group,
    Input,
    Label,
    ErrorMessage
} from './form-input.styles';

const FormInput = ({ handleChange, label, error, ...otherProps }) => (
    <Group>
        <Input onChange={handleChange} {...otherProps}>   
        </Input>
        {
            label ? (
                <Label>
                    {label}
                </Label>
            ) : null
        }
        {
            error ? (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            ) : null
        }
    </Group>
)

export default FormInput;