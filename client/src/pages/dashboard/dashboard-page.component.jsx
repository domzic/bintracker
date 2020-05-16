import React, {useEffect, useState} from 'react';
import MainBoard from '../../components/main-board/main-board.component';
import { PageContainer, Click } from './dashboard-page.styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BoardActions from '../../components/board-actions/board-actions.component';
import ContainersList from '../../components/containers-list/containers-list.component';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import AddIcon from '@material-ui/icons/Add';
import ContainerForm from '../../components/container-form/container-form.component';
import { Title, Wrapper } from '../../components/modal/modal.styles';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import axios from "axios";
import {Actions} from "../../state/constants";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        padding: theme.spacing(2, 4, 3),
        outline: 0,
    },
}));
const DashboardPage = () => {
    const [showAlert, setShowAlert] = useState(false);
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [device, setDevice] = useState(null);
    const getModalStyle = () => ({
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    });
    const [modalStyle] = useState(getModalStyle);
    
    useEffect(() => {
        const fetchDevice = async () => {
            const { data } = await axios.get('/api/stat/devices');
            if (data.length) {
                setDevice(data[0]);
                sessionStorage.setItem('alertShown', 'true');
                setShowAlert(true);
            }
        };
    
        window.setTimeout(() => {
            if (!sessionStorage.getItem("alertShown")) {
                fetchDevice();
            }
        }, 5000);
    }, []);

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };
    
    const closeModalAndAlert = () => {
        setOpenModal(false);
        setShowAlert(false);
    };

    const renderAlert = () => {
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={openModal}
                    onClose={handleModalClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <ContainerForm deviceId={{device}} closeModal={closeModalAndAlert}/>
                    </div>
                </Modal>
                <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit timeout={500}>
                    <Alert
                        className="alert"
                        severity="info"
                        color="warning"
                        onClose={closeAlert}
                    >
                        <AlertTitle>New device "{device}" found</AlertTitle>
                        Unregistered device found —{' '}
                        <Click onClick={handleModalOpen}>
                            click here to register it
                        </Click>
                    </Alert>
                </Slide>
            </div>
        );
    };

    return (
        <PageContainer>
            {showAlert ? renderAlert() : null}
            <BoardActions />
            <MainBoard />

            <ContainersList />
        </PageContainer>
    );
};

export default DashboardPage;
