import React, { useContext } from 'react';

import GoogleApiWrapper from '../map/google-map.component';
import BoardActions from '../board-actions/board-actions.component';

import { SensorContext } from '../../contexts/sensor.context';

import {
    Container,
    MapWrapper
} from './main-board.styles';

const MainBoard = () => {

    const sensorsContext = useContext(SensorContext);
    
    console.log("mainboard" , sensorsContext)
    return (
        <Container>
            <BoardActions />
            <MapWrapper>
                <GoogleApiWrapper sensorsContext={sensorsContext}/>
            </MapWrapper>
        </Container>
    );
}

export default MainBoard;