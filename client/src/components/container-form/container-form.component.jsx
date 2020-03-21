import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Form, ButtonsContainer, Error, Label } from './container-form.styles';


const ContainerForm = () => (
    <Container>
        <Formik
        initialValues={{}}
        onSubmit={async formValues => {
                console.log(formValues);
                // axios.post('/api/container', { formValues })
                //   .then(() => window.location.reload());
            }}
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
                    <TextField
                          required label="TTN device"
                          id="ttnDeviceId"
                            placeholder="Enter TTN device ID"
                            type="text"
                          value={values.ttnDeviceId}
                          onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.ttnDeviceId && touched.ttnDeviceId
                                    ? 'text-input error'
                                    : 'text-input'
                            }
                        />
                        {errors.ttnDeviceId && touched.ttnDeviceId && (
                            <Error>{errors.ttnDeviceId}</Error>
                        )}

                    <TextField
                        required label="Latitude"
                            id="latitude"
                            placeholder="Enter latitude"
                            type="number"
                            value={values.latitude}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.latitude && touched.latitude
                                    ? 'text-input error'
                                    : 'text-input'
                            }
                      />
                        {errors.latitude && touched.latitude && (
                            <Error>{errors.latitude}</Error>
                        )}

                        <TextField
                        required label="Longitude"
                        id="longitude"
                            placeholder="Enter longitude"
                            type="number"
                            value={values.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                                errors.longitude && touched.longitude
                                    ? 'text-input error'
                                    : 'text-input'
                            }
                      />
                        {errors.longitude && touched.longitude && (
                            <Error>{errors.longitude}</Error>
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

export default ContainerForm;
