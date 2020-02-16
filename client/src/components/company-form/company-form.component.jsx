import React, { useState } from 'react';
import axios from 'axios';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import validateEmails from '../../utils/validateEmails';

import {
    Headline,
    FormContainer,
    Form
} from './company-form.styles';
import Axios from 'axios';
import { STATES } from 'mongoose';

const CompanyForm = () => {

    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        admin: "",
        employees: ""
    });

    const handleSubmit = async event => {
        event.preventDefault();
        axios.post('/api/company', formData);
    }

    const handleEmployeesChange = async event => {
        event.preventDefault();
        let invalidEmails = validateEmails(event.target.value);
        if (invalidEmails) {
            setError(invalidEmails);
        } else {
            setError(null);
            setFormData({ 
                ...formData, 
                employees: event.target.value 
            });
        }
    }

    return (
        <FormContainer>
            <Headline>Register your own company</Headline>
            <Form onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='name'
                    label='Company name'
                    onChange={e => setFormData({ 
                        ...formData, 
                        name: e.target.value 
                    })}
                />
                <FormInput
                    type='email'
                    name='admin'
                    onChange={e => setFormData({ 
                        ...formData, 
                        admin: e.target.value
                    })}
                    label="Admin's gmail address"
                />
                <FormInput
                    type='text'
                    name='employees'
                    onChange={handleEmployeesChange}
                    label="Employees' gmail addresses"
                    error={error}
                />
                <Button type='submit' disabled={ error }>Register company</Button>
            </Form>
        </FormContainer>
    );
};

export default CompanyForm;