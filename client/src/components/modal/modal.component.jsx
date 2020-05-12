import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Title, Trigger, Wrapper } from './modal.styles';
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2, 4, 3),
        outline: 0
    }
}));

const CustomModal = ({ children, title, position, tooltipText, icon }) => {
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
        <Wrapper>
            <Trigger>
                <Tooltip title={tooltipText} aria-label="add">
                    <Fab
                         color="default"
                         size="small"
                         onClick={handleOpen}
                    >
                        {icon}
                    </Fab>
                </Tooltip>
            </Trigger>
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
        </Wrapper>
    );
};

export default CustomModal;
