import React, { useContext } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Form, ButtonsContainer, Title } from './user-form.styles';
import { Context } from '../../state/store';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';

const useButtonStyles = makeStyles({
    root: {
        borderColor: '#D2FFBE',
        '&:hover': {
            borderColor: '#67FB25',
        },
    },
    label: {
        color: '#fff',
        '&:hover': {
            color: '#D2FFBE',
        },
    },
});

const useTextFieldStyles = makeStyles({
    input: {
        color: '#C8C8C8',
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #000',
        },
        '&:after': {
            borderBottom: `2px solid #D2FFBE`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid #D2FFBE`,
        },
    },
    label: {
        color: '#83936F',

        '&.Mui-focused': {
            color: '#D2FFBE',
        },
    },
});

const UserForm = () => {
    const textFieldClasses = useTextFieldStyles();
    const buttonClasses = useButtonStyles();

    const [state, dispatch] = useContext(Context);
    const { user } = state;
    return (
        <Container>
            <Title>Update your profile</Title>
            <Formik
                initialValues={{
                    displayName: user.displayName,
                    phone: user.phone || '',
                    position: user.position || '',
                }}
                onSubmit={async (formData, actions) => {
                    actions.setSubmitting(true);
                    await axios.post('/api/user', { formData });
                    actions.setSubmitting(false);
                    toast.success('Success!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
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
                        handleReset,
                    } = props;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        classes: textFieldClasses,
                                    }}
                                    InputLabelProps={{
                                        className: textFieldClasses.label,
                                    }}
                                    label="Display name"
                                    id="displayName"
                                    placeholder="Enter display name"
                                    type="text"
                                    value={values.displayName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.displayName &&
                                        touched.displayName
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        classes: textFieldClasses,
                                    }}
                                    InputLabelProps={{
                                        className: textFieldClasses.label,
                                    }}
                                    label="Phone number"
                                    id="phone"
                                    placeholder="Enter phone number"
                                    type="text"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.phone && touched.phone
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        classes: textFieldClasses,
                                    }}
                                    InputLabelProps={{
                                        className: textFieldClasses.label,
                                    }}
                                    label="Position"
                                    id="position"
                                    placeholder="Enter your position"
                                    type="text"
                                    value={values.position}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.position && touched.position
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                            </div>
                            <ButtonsContainer>
                                <Button
                                    type="submit"
                                    classes={buttonClasses}
                                    disabled={isSubmitting}
                                    variant="outlined"
                                    color="primary"
                                >
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

export default UserForm;
