import React, { useContext } from 'react';
import MapIcon from '@material-ui/icons/Map';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Option, Selection} from './board-actions.styles';
import Modal from '../modal/modal.component';
import ContainerForm from '../container-form/container-form.component';
import { ButtonText } from '../modal/modal.styles';
import { Context } from '../../state/store';
import { Actions, Filter, MapView } from '../../state/constants';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddIcon from '@material-ui/icons/Add';
import ContainersList from "../containers-list/containers-list.component";
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios';

export const actionButtonStyles = makeStyles({
    root: {
        width: '100%',
        marginBottom: 25,
        transition: 'all .2s',
        backgroundColor: 'rgba(255, 255, 255, .04)',
        
        '&:hover': {
            transform: 'scale(0.95)',
            borderColor: '#607A2E',
        },
    }
});

const BoardActions = props => {
    const buttonClasses = actionButtonStyles();
    const [state, dispatch] = useContext(Context);
    const showDirections = () => {
        dispatch({ type: Actions.SET_MAP_VIEW, payload: MapView.DIRECTIONS });
        toast.success('Showing directions.');
    };

    const showContainers = () => {
        dispatch({ type: Actions.SET_MAP_VIEW, payload: MapView.MAP });

        if (state.filter !== Filter.ALL) {
            dispatch({ type: Actions.CHANGE_FILTER, payload: Filter.ALL });
        }

        toast.success('Showing all containers.');
    };

    const refreshData = async () => {
        try {
            const response = await axios.get('/api/container/fetch');
            dispatch({
                type: Actions.SET_CONTAINERS,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Container>
            <Selection onClick={refreshData}>
                <CachedIcon />
                <ButtonText>Refresh data</ButtonText>
            </Selection>
            <Selection>
                <RestoreFromTrashIcon />
                <ButtonText>See containers</ButtonText>
            </Selection>
            <Selection>
                <MapIcon />
                <ButtonText>See directions</ButtonText>
            </Selection>
            <Modal
                icon={<AddIcon/>}
                title="Add container"
                position={{ top: 50, left: 50 }}
                buttonText="Add container"
            >
                <ContainerForm />
            </Modal>

        </Container>
    );
};

export default BoardActions;
