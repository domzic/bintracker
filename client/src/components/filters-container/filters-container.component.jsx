import React, { useContext } from 'react';

import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import { green, yellow, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Container, Filter, Count } from './filters-container.styles';
import {Filter as FilterType, MapView} from '../../state/constants';
import { Context } from '../../state/store';
import { Actions } from '../../state/constants';
import { toast } from 'react-toastify';
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const filterButtonStyles = makeStyles({
    root: {
        height: 50,
        width: '80%',
        transition: 'all .2s',
        '&:hover': {
            transform: 'scale(0.9)',
        },
        '&:disabled': {
            transform: 'scale(0.8)',
        },
    },
    label: {
        color: '#fff'
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
                payload: MapView.MAP
            })
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

    const getButtonText = count => {
        if (responsive) {
            return count;
        }
        return count === 0 ? 'No containers' : count === 1 ? '1 container' : `${count} containers`;
    };

    return (
        <Container>
            <MuiThemeProvider theme={theme}>
                <Filter>
                    <Button
                        variant="outlined"
                        style={{ border: `1px solid ${green[500]}` }}
                        size="small"
                        startIcon={
                            <RestoreFromTrashIcon
                                fontSize="large"
                                style={{ color: green[500] }}
                            />
                        }
                        type="button"
                        onClick={() => onFilterClick(FilterType.GREEN)}
                        disabled={state.filter === FilterType.GREEN || state.mapView === MapView.DIRECTIONS}
                        classes={{
                            root: buttonClasses.root,
                            label: buttonClasses.label,
                        }}
                    >
                        <Count>
                            {getButtonText(containers.green.length)}
                        </Count>
                    </Button>
                </Filter>
                <Filter>
                    <Button
                        variant="outlined"
                        style={{ border: `1px solid ${yellow[500]}` }}
                        startIcon={
                            <RestoreFromTrashIcon
                                fontSize="large"
                                style={{ color: yellow[500] }}
                            />
                        }
                        type="button"
                        disabled={state.filter === FilterType.YELLOW || state.mapView === MapView.DIRECTIONS}
                        onClick={() => onFilterClick(FilterType.YELLOW)}
                        classes={{
                            root: buttonClasses.root,
                            label: buttonClasses.label,
                        }}
                    >
                        <Count>
                            {getButtonText(containers.yellow.length)}
                        </Count>
                    </Button>
                </Filter>
                <Filter>
                    <Button
                        variant="outlined"
                        style={{ border: `1px solid ${red[500]}` }}
                        startIcon={
                            <RestoreFromTrashIcon
                                fontSize="large"
                                style={{ color: red[500] }}
                            />
                        }
                        classes={{
                            root: buttonClasses.root,
                            label: buttonClasses.label,
                        }}
                        type="button"
                        disabled={state.filter === FilterType.RED || state.mapView === MapView.DIRECTIONS}
                        onClick={() => onFilterClick(FilterType.RED)}
                    >
                        <Count>
                            {getButtonText(containers.red.length)}
                        </Count>
                    </Button>
                </Filter>
            </MuiThemeProvider>
        </Container>
    );
};

export default FiltersContainer;
