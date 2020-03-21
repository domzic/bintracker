import React from 'react';
import MapIcon from '@material-ui/icons/Map';
import Button from '@material-ui/core/Button';
import { Container, Option } from './board-actions.styles';
import Modal from '../modal/modal.component';
import ContainerForm from '../container-form/container-form.component';
import { ButtonText } from '../modal/modal.styles';
import {toast} from "react-toastify";

const BoardActions = () => {

    const showDirections = event => {
        toast.success('Showing directions')
    };
    return (
        <Container>
            <Option>
                <Modal
                    title="Container form"
                    position={{ top: 50, left: 50 }}
                    buttonText="Add container"
                >
                    <ContainerForm />
                </Modal>
            </Option>
            <Option>
                <Button
                    variant="contained"
                    color="default"
                    style={{ width: '100%', height: 50, color: '#015408' }}
                    size="big"
                    startIcon={<MapIcon />}
                    type="button"
                    onClick={showDirections}
                >
                    <ButtonText>Get directions</ButtonText>
                </Button>
            </Option>
        </Container>
    );
};

export default BoardActions;
