/* global google */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Form, Row } from './container-form.styles';
import { Context } from '../../state/store';
import { toast } from 'react-toastify';
import { useFormButtonStyles, useTextFieldStyles } from '../utils/mui-styles';
import { FormError } from '../company-form/company-form.styles';
import { Actions } from '../../state/constants';

const ContainerFormSchema = Yup.object().shape({
    ttnDeviceId: Yup.string()
        .min(4, 'Minimum 2 characters are required.')
        .max(50, 'Maximum 50 characters are allowed.')
        .required('Required'),
    latitude: Yup.number()
        .min(-90, 'Latitude must be between -90 and 90.')
        .max(90, 'Latitude must be between -90 and 90.')
        .required('Required'),
    longitude: Yup.number()
        .min(-180, 'Longitude must be between -180 and 180.')
        .max(180, 'Longitude must be between -180 and 180.')
        .required('Required'),
    level: Yup.number()
        .min(0, 'Level mus be between 0 and 100.')
        .max(100, 'Level must be between 0 and 100.')
        .required('Required'),
});

const ContainerForm = ({ deviceId, closeModal, lat, lng }) => {
    const [state, dispatch] = useContext(Context);
    const textFieldClasses = useTextFieldStyles();
    const buttonClasses = useFormButtonStyles();
    const geocoder = new google.maps.Geocoder();

    const parseAddress = data =>
        `${data[0].address_components[1].long_name} ${data[0].address_components[0].long_name}, ${data[0].address_components[2].long_name}`;
    const handleSubmit = async (formData, actions) => {
        actions.setSubmitting(true);
        try {
            geocoder.geocode({ location: { lat, lng } }, async geo => {
                const { data } = await axios.post('/api/container', {
                    formData: { ...formData, address: parseAddress(geo) },
                });
                actions.setSubmitting(false);
                closeModal();
                dispatch({ type: Actions.SET_CONTAINERS, payload: data });
                toast.success('Success!');
            });
        } catch (error) {
            actions.setErrors(
                error.response.data.reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: `This TTN device is already registered.`,
                    };
                }, {})
            );
        }
    };

    return (
        <Container>
            <Formik
                initialValues={{
                    ttnDeviceId: deviceId ? deviceId.device : '',
                    latitude: lat
                        ? lat
                        : state.userLocation
                        ? state.userLocation.lat.toFixed(4)
                        : '',
                    longitude: lng
                        ? lng
                        : state.userLocation
                        ? state.userLocation.lng.toFixed(4)
                        : '',
                    level: '',
                }}
                enableReinitialize
                onSubmit={handleSubmit}
                validationSchema={ContainerFormSchema}
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
                            <Row>
                                <TextField
                                    autoComplete="off"
                                    fullWidth
                                    label="TTN device"
                                    id="ttnDeviceId"
                                    placeholder="Enter TTN device ID"
                                    type="text"
                                    value={values.ttnDeviceId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        classes: textFieldClasses,
                                        error: errors.email && touched.email,
                                    }}
                                    InputLabelProps={{
                                        className:
                                            errors.email && touched.email
                                                ? 'form-label errored'
                                                : 'form-label',
                                    }}
                                />
                                <FormError>
                                    <ErrorMessage name="ttnDeviceId" />
                                </FormError>
                            </Row>
                            {lat === null ? (
                                <Row>
                                    <TextField
                                        autoComplete="off"
                                        fullWidth
                                        label="Latitude"
                                        id="latitude"
                                        placeholder="Enter latitude"
                                        type="number"
                                        value={values.latitude}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                    />
                                    <FormError>
                                        <ErrorMessage name="latitude" />
                                    </FormError>
                                </Row>
                            ) : null}
                            {lat === null ? (
                                <Row>
                                    <TextField
                                        autoComplete="off"
                                        fullWidth
                                        label="Longitude"
                                        id="longitude"
                                        placeholder="Enter longitude"
                                        type="number"
                                        value={values.longitude}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                    />
                                    <FormError>
                                        <ErrorMessage name="longitude" />
                                    </FormError>
                                </Row>
                            ) : null}
                            <Row>
                                <TextField
                                    autoComplete="off"
                                    fullWidth
                                    label="Level (for testing)"
                                    id="level"
                                    placeholder="Enter level"
                                    type="number"
                                    value={values.level}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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
                                />
                                <FormError>
                                    <ErrorMessage name="level" />
                                </FormError>
                            </Row>
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
        </Container>
    );
};

export default ContainerForm;
