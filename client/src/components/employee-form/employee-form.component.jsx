import React, {useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    Container,
    Form,
    ButtonsContainer,
    Error,
    Label,
} from './employee-form.styles';
import { toast } from 'react-toastify';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { gmailRegex } from "../../utils/validateEmails";

const EmployeeForm = () => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        if (event.target.value.match(gmailRegex)) {
            setEmail(event.target.value);
            setError('');
        } else {
            setError('Invalid email address');
        }
    };

    const onSubmit = async () => {
        try {
            const response = await axios.post('/api/company/employee', {email});
            toast.success('Success!');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log('error', error);
            setError(`Email ${email} is already registered.`);
        }
    };

    return (
        <Container>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add employee
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you want add employee to your company, please enter email address. After this step, entered
                        email will have access to your company.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        error={error}
                        helperText={error}
                        onChange={handleChange.bind(this)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" disabled={error}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EmployeeForm;
