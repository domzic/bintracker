import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Form, ButtonsContainer, Error, Label } from './employee-form.styles';


const EmployeeForm = () => (
    <Container>
    <Formik
          initialValues={{ email: '' }}
          onSubmit={async values => {
                axios.post('/api/company/employee', { email: values.email })
                    .then(() => window.location.reload());
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required('Required')
            })}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset
                } = props;
                return (
                  <Form onSubmit={handleSubmit}>
                      <Label htmlFor="email">
                          Add employee
                    </Label>
                      <TextField
                          required label="Required" defaultValue="Hello World"
                            id="email"
                          placeholder="Enter employee email"
                          type="text"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                                errors.email && touched.email
                                    ? 'text-input error'
                                    : 'text-input'
                            }
                        />
                      {errors.email && touched.email && (
                        <Error>{errors.email}</Error>
                        )}
                      <ButtonsContainer>
                            <Button
                          variant="outlined" color="secondary"
                          type="button"
                                className="outline"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                        >
                  Reset
                        </Button>
                          <Button type="submit" disabled={isSubmitting} variant="outlined" color="primary">
                              Submit
                </Button>
                        </ButtonsContainer>
                    </Form>
                );
            }}
        </Formik>
  </Container>
);

export default EmployeeForm;
