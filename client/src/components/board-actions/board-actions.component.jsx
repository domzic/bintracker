import React, { useContext } from 'react';
import MapIcon from '@material-ui/icons/Map';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Option } from './board-actions.styles';
import Modal from '../modal/modal.component';
import ContainerForm from '../container-form/container-form.component';
import { ButtonText } from '../modal/modal.styles';
import { Context } from '../../state/store';
import { Actions, MapView } from '../../state/constants';

export const actionButtonStyles = makeStyles({
    root: {
        height: 50,
        width: '100%',
        backgroundColor: '#398340',
        marginBottom: 25,
        transition: 'all .2s',
        '&:hover': {
            transform: 'scale(1.05) translateX(10px) rotate(1deg)',
            backgroundColor: '#398340'
        }
    },
    label: {
        color: '#fff'
    }
});

const BoardActions = (props) => {
    const buttonClasses = actionButtonStyles();
    const [state, dispatch] = useContext(Context);

    const showDirections = () => {
        dispatch({ type: Actions.SET_MAP_VIEW, payload: MapView.DIRECTIONS });
        toast.success('Showing directions.');
    };

    const showContainers = () => {
        dispatch({ type: Actions.SET_MAP_VIEW, payload: MapView.MAP });
        toast.success('Showing containers.');
    };

    return (
        <Container>
            <Button
            variant="contained"
                color="default"
            size="big"
            startIcon={<RestoreFromTrashIcon />}
                type="button"
            disabled={state.mapView === 'map'}
                onClick={showContainers}
            classes={{
                    root: buttonClasses.root,
                    label: buttonClasses.label
                }}
          >
            <ButtonText>See containers</ButtonText>
          </Button>
            <Button
                variant="contained"
                color="default"
                size="big"
            startIcon={<MapIcon />}
            type="button"
                disabled={state.mapView === 'directions'}
            onClick={showDirections}
                classes={{
                    root: buttonClasses.root,
                    label: buttonClasses.label
                }}
          >
                <ButtonText>See directions</ButtonText>
          </Button>
            <Modal
                title="Container form"
                position={{ top: 50, left: 50 }}
                buttonText="Add container"
          >
                <ContainerForm />
          </Modal>
      </Container>
    );
};

export default BoardActions;
