import React, { useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {
    Headline,
    FormContainer,
    Form,
    FormError,
    Row,
} from './company-form.styles';
import { useFormButtonStyles, useTextFieldStyles } from '../utils/mui-styles';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Formik } from 'formik';
import { Context } from '../../state/store';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { Actions } from '../../state/constants';

const CompanyForm = ({ title, showAdminField, creationForm }) => {
    
    const CompanyFormSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Minimum 4 characters are required.')
            .max(50, 'Maximum 50 characters are allowed.')
            .required('Required'),
        admin: creationForm ? Yup.string().email('Invalid email').required('Required') : '',
        ttnAppName: Yup.string()
            .min(2, 'Minimum 2 characters are required.')
            .max(50, 'Maximum 50 characters are allowed.')
            .required('Required'),
        emailsString: Yup.array()
            .transform(function (value, originalValue) {
                if (this.isType(value) && value !== null) {
                    return value;
                }
                return originalValue ? originalValue.split(/[\s,]+/) : [];
            })
            .of(Yup.string().email(({ value }) => `${value} is not a valid email`)),
    });
    
    const [state, dispatch] = useContext(Context);
    const { company, user } = state;
    const textFieldClasses = useTextFieldStyles();
    const buttonClasses = useFormButtonStyles();

    const handleSubmit = async (formData, actions) => {
        console.log(formData);
        return creationForm ? handleCreate(formData, actions) : handleUpdate(formData, actions);
    };

    const handleUpdate = async (formData, actions) => {
        actions.setSubmitting(true);
        try {
            const response = await axios.post('/api/company/update', {
                formData,
            });
            toast.success('Success!');
            setTimeout(() => {
                dispatch({ type: Actions.SET_COMPANY, payload: response.data });
            }, 1000);
        } catch (error) {
            actions.setErrors(
                error.response.data.reduce((obj, key) => {
                    const value =
                        key === 'name' ? 'company name' : 'TTN application';
                    return {
                        ...obj,
                        [key]: `This ${value} is already registered.`,
                    };
                }, {})
            );
        }
    };

    const handleCreate = async (formData, actions) => {
        actions.setSubmitting(true);
        try {
            const response = await axios.post('/api/company', {
                formData,
            });
            toast.success('Success!');
            setTimeout(() => {
                window.location.href = '/signin?success=true';
            }, 1000);
        } catch (error) {
            actions.setErrors(
                Array.isArray(error.response.data) &&
                    error.response.data.length > 1
                    ? {
                          emailsString: `Already registered: ${error.response.data.join(
                              ', '
                          )}`,
                      }
                    : error.response.data.reduce((obj, key) => {
                          let value = '';
                          switch (key) {
                              case 'name':
                                  value = 'This company is already registered!';
                                  break;
                              case 'admin':
                                  value = 'This email is already registered!';
                                  break;
                              case 'ttnAppName':
                                  value =
                                      'This TTN application is already registered!';
                                  break;
                              default:
                                  value = `Email already registered: ${key}!`;
                                  key = 'emailsString';
                          }
                          return { ...obj, [key]: value };
                      }, {})
            );
        }
    };

    return (
        <FormContainer>
            <Headline>{title ? title : 'Register your own company'}</Headline>
            <Formik
                initialValues={{
                    name: company ? company.name : '',
                    admin: '',
                    emailsString: '',
                    ttnAppName: company ? company.ttnAppName : '',
                }}
                validationSchema={CompanyFormSchema}
                onSubmit={handleSubmit}
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
                        handleReset,
                    } = props;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <Row>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            classes: textFieldClasses,
                                            error: errors.name && touched.name,
                                        }}
                                        InputLabelProps={{
                                            className:
                                                errors.name && touched.name
                                                    ? 'form-label errored'
                                                    : 'form-label',
                                        }}
                                        autoComplete="off"
                                        label="Company name"
                                        id="name"
                                        placeholder="Enter company name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormError>
                                        <ErrorMessage name="name" />
                                    </FormError>
                                </Row>
                                {showAdminField ? (
                                    <Row>
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                classes: textFieldClasses,
                                                error:
                                                    errors.admin &&
                                                    touched.admin,
                                            }}
                                            InputLabelProps={{
                                                className:
                                                    errors.admin &&
                                                    touched.admin
                                                        ? 'form-label errored'
                                                        : 'form-label',
                                            }}
                                            autoComplete="off"
                                            label="Administrator email"
                                            id="admin"
                                            placeholder="Enter your email"
                                            type="email"
                                            value={values.admin}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <FormError>
                                            <ErrorMessage name="admin" />
                                        </FormError>
                                    </Row>
                                ) : null}
                                <Row>
                                    <TextField
                                        fullWidth
                                        InputProps={{
                                            classes: textFieldClasses,
                                            error:
                                                errors.ttnAppName &&
                                                touched.ttnAppName,
                                        }}
                                        InputLabelProps={{
                                            className:
                                                errors.ttnAppName &&
                                                touched.ttnAppName
                                                    ? 'form-label errored'
                                                    : 'form-label',
                                        }}
                                        autoComplete="off"
                                        label="TTN application name"
                                        id="ttnAppName"
                                        placeholder="Enter TTN application name"
                                        type="text"
                                        value={values.ttnAppName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormError>
                                        <ErrorMessage name="ttnAppName" />
                                    </FormError>
                                </Row>
                                {!user ? (
                                    <Row>
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                classes: textFieldClasses,
                                            }}
                                            InputLabelProps={{
                                                className: 'form-label',
                                            }}
                                            autoComplete="off"
                                            label="Employees"
                                            id="emailsString"
                                            placeholder="Enter employees emails"
                                            type="text"
                                            value={values.emailsString}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <FormError>
                                            <ErrorMessage name="emailsString" />
                                        </FormError>
                                    </Row>
                                ) : null}
                            </div>
                            <Button
                                type="submit"
                                classes={buttonClasses}
                                disabled={isSubmitting}
                                variant="outlined"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </FormContainer>
    );
};

export default CompanyForm;
