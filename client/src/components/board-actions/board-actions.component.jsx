import React, {useContext, useState} from 'react';
import MapIcon from '@material-ui/icons/Map';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Top, Selection} from './board-actions.styles';
import { Context } from '../../state/store';
import { Actions, Filter, MapView } from '../../state/constants';
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios';
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import FiltersContainer from "../filters-container/filters-container.component";

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
    const [active, setActive] = useState('all');
    
    const showDirections = () => {
        dispatch({ type: Actions.SET_MAP_VIEW, payload: MapView.DIRECTIONS });
        setActive('directions');
        toast.success('Showing directions.');
    };

    const showContainers = () => {
        dispatch({ type: Actions.SET_MAP_VIEW, payload: MapView.MAP });
        setActive('all');
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
            toast.error('No data found in cloud server.');
        }

    };

    return (
        <Container>
            <Top>
            <Selection>
                <Tooltip title="All containers" aria-label="all">
                    <Fab disabled={active === 'all' && state.mapView === MapView.MAP && state.filter === Filter.ALL}
                         color="default"
                         size="small"
                    >
                        <RestoreFromTrashIcon onClick={showContainers} />
                    </Fab>
                </Tooltip>
            </Selection>
            <FiltersContainer/>
            </Top>
            <Selection>
                <Tooltip title="Directions" aria-label="directions">
                    <Fab disabled={active === 'directions'}
                        color="default"
                        size="small"
                    >
                        <MapIcon onClick={showDirections} />
                    </Fab>
                </Tooltip>
            </Selection>
            <Selection>
                <Tooltip title="Refresh data" aria-label="refresh">
                    <Fab
                        color="default"
                        size="small"
                    >
                        <CachedIcon onClick={refreshData} />
                    </Fab>
                </Tooltip>
            </Selection>

        </Container>
    );
};

export default BoardActions;
