import React, {useContext} from 'react';

import BoardActions from '../board-actions/board-actions.component';

import { Container,
    MapWrapper } from './main-board.styles';
import { Context } from '../../state/store';
import Map from '../map/google-map.component';

const MainBoard = ( props ) => {
    const state = useContext(Context)[0];

    const {
        loadingElement,
        containerElement,
        mapElement
    } = props;

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
                    markers={state.containers}
                    loadingElement={loadingElement || <div style={{height: `100%`}}/>}
                    containerElement={containerElement || <div style={{height: "80vh"}}/>}
                    mapElement={mapElement || <div style={{height: `100%`}}/>}
                />
            </MapWrapper>
        </Container>
    );
};

export default MainBoard;
