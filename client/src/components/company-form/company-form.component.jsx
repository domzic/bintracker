import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import validateEmails from '../../utils/validateEmails';

import { Headline,
    FormContainer,
    Form } from './company-form.styles';

const CompanyForm = () => {

    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        admin: '',
        employees: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();
        axios.post('/api/company', formData)
            .then(result => result.json())
            .then(result => {
                console.log('Success', result.data);
            }).catch(error => {
                console.log('Error: ', error.response);
            });
    };

    const handleEmployeesChange = async event => {
        event.preventDefault();
        const invalidEmails = validateEmails(event.target.value);
        if (invalidEmails) {
            setError(invalidEmails);
        } else {
            setError(null);
            setFormData({
                ...formData,
                employees: event.target.value
            });
        }
    };

    return (
        <FormContainer>

            <Headline>Register your own company</Headline>
        <Form onSubmit={handleSubmit}>
            <FormInput
                    type="text"
                    name="name"
            label="Company name"
            onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                    })}
            required
          />
                <FormInput
                    type="email"
                    name="admin"
                    onChange={e => setFormData({
                        ...formData,
                        admin: e.target.value
                    })}
                    label="Admin's gmail address"
            required
          />
                <FormInput
                    type="text"
                    name="employees"
                    onChange={handleEmployeesChange}
                    label="Employees' gmail addresses"
                    error={error}
                    required
          />
                <Button type="submit" disabled={error}>Register company</Button>
          </Form>
      </FormContainer>
    );
};

export default CompanyForm;
