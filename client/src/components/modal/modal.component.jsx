import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Title, ButtonText } from './modal.styles';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2, 4, 3),
        outline: 0
    }
}));

const CustomModal = ({ children, title, position, buttonText }) => {
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
            <Button
            variant="contained"
            color="default"
            style={{ width: '100%', height: 50, color: '#015408' }}
            size="big"
                className={classes.button}
                startIcon={<AddIcon />}
            type="button"
            onClick={handleOpen}
          >
                <ButtonText>{buttonText}</ButtonText>
          </Button>
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
