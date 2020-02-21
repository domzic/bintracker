import React from 'react';

import GoogleApiWrapper from '../map/google-map.component';
import BoardActions from '../board-actions/board-actions.component';

import {
    Container,
    MapWrapper
} from './main-board.styles';

const MainBoard = () => {
    return (
        <Container>
            <BoardActions />
            <MapWrapper>
                <GoogleApiWrapper />
            </MapWrapper>
        </Container>
    );
}

export default MainBoard;