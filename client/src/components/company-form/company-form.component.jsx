import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import validateEmails from '../../utils/validateEmails';

import {
    Headline,
    FormContainer,
    Form
} from './company-form.styles';

const CompanyForm = () => {

    const [error, setError] = useState(null);

    const handleSubmit = async event => {
        
    }

    const handleChange = async event => {
        event.preventDefault();
        let invalidEmails = validateEmails(event.target.value);
        setError(invalidEmails ? invalidEmails : null);
    }

    return (
        <FormContainer>
            <Headline>Register your own company</Headline>
            <Form onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='name'
                    label='Company name'
                />
                <FormInput
                    type='text'
                    name='employees'
                    onChange={handleChange}
                    label="Employee's gmail addresses"
                    error={error}
                />
                <Button type='submit' disabled={error}>Register company</Button>
            </Form>
        </FormContainer>
    );
};

export default CompanyForm;