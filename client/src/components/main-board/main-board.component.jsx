import React, {useContext} from 'react';

import BoardActions from '../board-actions/board-actions.component';

import { Container,
    MapWrapper } from './main-board.styles';
import { Context } from '../../state/store';
import Map from '../map/google-map.component';
import {Filter, MapView} from "../../state/constants";

const MainBoard = ( props ) => {
    const state = useContext(Context)[0];
    const { containers } = state;
    const {
        loadingElement,
        containerElement,
        mapElement
    } = props;

    const getActiveMarkers = () => {
        if (state.mapView === MapView.DIRECTIONS) {
            return containers.red;
        }

        switch (state.filter) {
            case Filter.ALL:
                return containers.green
                    .concat(containers.yellow)
                    .concat(containers.red);
            case Filter.GREEN:
                return containers.green;
            case Filter.YELLOW:
                return containers.yellow;
            case Filter.RED:
                return containers.red;
        }
    };

    return (
        <Container>
            <BoardActions />
            <MapWrapper>
                <Map
                    googleMapURL={
                        'https://maps.googleapis.com/maps/api/js?key=' +
                    process.env.REACT_APP_GOOGLE_API_KEY +
                    '&libraries=geometry,drawing,places'
                    }
                    mapView={state.mapView}
                    markers={getActiveMarkers()}
                    loadingElement={loadingElement || <div style={{height: `100%`}}/>}
                    containerElement={containerElement || <div style={{height: "80vh"}}/>}
                    mapElement={mapElement || <div style={{height: `100%`}}/>}
                />
            </MapWrapper>
        </Container>
    );
};

export default MainBoard;
