import React, { useContext, reac } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Form, ButtonsContainer, Error } from './container-form.styles';
import { Context } from '../../state/store';
import { toast } from 'react-toastify';

const ContainerForm = (  ) => {
    const [state, dispatch] = useContext(Context);
    return (
        <Container>
            <Formik
                initialValues={{}}
                onSubmit={async (formData, actions) => {
                    actions.setSubmitting(true);
                    axios.post('/api/container', { formData })
                        .then(response => {
                            actions.setSubmitting(false);
                            toast.success('Success!');
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        })
                        .catch(error => {
                            actions.setFieldError('ttnDeviceId', 'This device is already registered');
                            actions.setSubmitting(false);
                        });
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
                            <div>
                                <TextField
                                    style={{width: '100%'}}
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
                            </div>
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

                            <TextField
                                label="Level (for testing)"
                                id="level"
                                placeholder="Enter level"
                                type="number"
                                value={values.level}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

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
};

export default ContainerForm;
