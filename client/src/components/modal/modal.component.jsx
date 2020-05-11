import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Title, ButtonText } from './modal.styles';
import {actionButtonStyles} from "../board-actions/board-actions.component";
import MapIcon from "@material-ui/icons/Map";
import {Selection} from "../board-actions/board-actions.styles";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2, 4, 3),
        outline: 0
    }
}));

const CustomModal = ({ children, title, position, buttonText, icon }) => {
    const classes = useStyles();
    const getModalStyle = () => ({
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: `translate(-${position.top}%, -${position.left}%)`
    });

    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Selection>
                {icon}
                <ButtonText>{buttonText}</ButtonText>
            </Selection>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <Title>{title}</Title>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default CustomModal;
