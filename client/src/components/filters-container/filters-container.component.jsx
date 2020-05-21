import React, { useContext } from 'react';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import { green, yellow, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import {
    Container,
    Filter,
} from './filters-container.styles';
import { Filter as FilterType, MapView } from '../../state/constants';
import { Context } from '../../state/store';
import { Actions } from '../../state/constants';
import { toast } from 'react-toastify';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

export const filterButtonStyles = makeStyles({
    root: {
        height: 32,
        width: '80%',
        transition: 'all .2s',
        '&:hover': {
            transform: 'scale(0.9)',
        },
        '&:disabled': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    label: {
        color: '#fff',
    },
});

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: yellow,
    },
});

const FiltersContainer = () => {
    const [state, dispatch] = useContext(Context);
    const { containers } = state;
    const buttonClasses = filterButtonStyles();

    const responsive = useMediaQuery('(max-width:768px)');
    const onFilterClick = filterType => {
        if (state.mapView === MapView.DIRECTIONS) {
            dispatch({
                type: Actions.SET_MAP_VIEW,
                payload: MapView.MAP,
            });
        }

        switch (filterType) {
            case FilterType.GREEN:
                toast.success('Showing empty containers');
                dispatch({
                    type: Actions.CHANGE_FILTER,
                    payload: FilterType.GREEN,
                });
                break;
            case FilterType.YELLOW:
                toast.success('Showing medium containers');
                dispatch({
                    type: Actions.CHANGE_FILTER,
                    payload: FilterType.YELLOW,
                });
                break;
            case FilterType.RED:
                toast.success('Showing full containers');
                dispatch({
                    type: Actions.CHANGE_FILTER,
                    payload: FilterType.RED,
                });
                break;
        }
    };

    return (
        <Container>
            <Filter>
                <Tooltip title={`Green containers (${containers.green.length})`} aria-label="green">
                    <Fab disabled={
                            state.filter === FilterType.GREEN
                            || state.mapView === MapView.DIRECTIONS
                            || !containers.green.length
                    }
                         color="default"
                         size="small"
                    >
                        <RestoreFromTrashIcon
                            style={{ color: green[500] }}
                            onClick={() => onFilterClick(FilterType.GREEN)} />
                    </Fab>
                </Tooltip>
            </Filter>
            <Filter>
                <Tooltip title={`Yellow containers (${containers.yellow.length})`} aria-label="yellow">
                    <Fab disabled={
                        state.filter === FilterType.YELLOW
                        || state.mapView === MapView.DIRECTIONS
                        || !containers.yellow.length
                    }
                         color="default"
                         size="small"
                    >
                        <RestoreFromTrashIcon
                            style={{ color: yellow[700] }}
                            onClick={() => onFilterClick(FilterType.YELLOW)} />
                    </Fab>
                </Tooltip>
            </Filter>
            <Filter>
                <Tooltip title={`Red containers (${containers.red.length})`} aria-label="red">
                    <Fab disabled={
                        state.filter === FilterType.RED
                        || state.mapView === MapView.DIRECTIONS
                        || !containers.red.length
                    }
                         color="default"
                         size="small"
                    >
                        <RestoreFromTrashIcon
                            style={{ color: red[500] }}
                            onClick={() => onFilterClick(FilterType.RED)} />
                    </Fab>
                </Tooltip>
            </Filter>
        </Container>
    );
};

export default FiltersContainer;
