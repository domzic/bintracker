import React, {useContext, useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Form, ButtonsContainer } from './employee-form.styles';
import { toast } from 'react-toastify';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { useFormButtonStyles, useTextFieldStyles } from '../utils/mui-styles';
import { makeStyles } from '@material-ui/core/styles';
import { FormError } from '../company-form/company-form.styles';
import {Context} from "../../state/store";
import {Actions} from "../../state/constants";

const EmailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const EmployeeForm = () => {
    const dispatch = useContext(Context)[1];
    const [open, setOpen] = useState(false);
    const textFieldClasses = useTextFieldStyles();
    const buttonClasses = useFormButtonStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (formData, actions) => {
        try {
            actions.setSubmitting(true);
            const response = await axios.post('/api/company/employee', {
                formData,
            });
            toast.success('Success!');
            setTimeout(() => {
                dispatch({ type: Actions.SET_COMPANY, payload: response.data});
                setOpen(false);
            }, 1000);
        } catch (error) {
            actions.setErrors(
                error.response.data.reduce((obj, key) => {
                    return {
                        ...obj,
                        [key]: `This email is already registered.`,
                    };
                }, {})
            );
        }
    };

    return (
        <Container>
            <Tooltip title="Add employee" aria-label="add">
                <Fab color="default">
                    <AddIcon onClick={handleClickOpen} />
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you want add employee to your company, please enter
                        email address. After this step, entered email will have
                        access to your company.
                    </DialogContentText>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={EmailSchema}
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
                                    <TextField
                                        InputProps={{
                                            classes: textFieldClasses,
                                            error:
                                                errors.email && touched.email,
                                        }}
                                        InputLabelProps={{
                                            className:
                                                errors.email && touched.email
                                                    ? 'form-label errored'
                                                    : 'form-label',
                                        }}
                                        autoComplete="off"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        value={values.email}
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <FormError>
                                        <ErrorMessage name="email" />
                                    </FormError>
                                    <ButtonsContainer>
                                        <Button
                                            classes={makeStyles({
                                                root: {
                                                    borderColor: '#FFAAAA',

                                                    '&:hover': {
                                                        borderColor: '#FF5D5D',
                                                    },
                                                },
                                                label: {
                                                    color: '#fff',
                                                    '&:hover': {
                                                        color: '#FFAAAA',
                                                    },
                                                },
                                            })()}
                                            onClick={handleClose}
                                            variant="outlined"
                                            color="primary"
                                            className="cancel"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            classes={buttonClasses}
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Confirm
                                        </Button>
                                    </ButtonsContainer>
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default EmployeeForm;
