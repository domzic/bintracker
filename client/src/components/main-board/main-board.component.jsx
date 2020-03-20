import React, { useContext } from 'react';

import GoogleApiWrapper from '../map/google-map.component';
import BoardActions from '../board-actions/board-actions.component';


import {
    Container,
    MapWrapper
} from './main-board.styles';

import { ContainerContext } from "../../contexts/container.context";

const MainBoard = () => {

    const containersContext = useContext(ContainerContext);

    return (
        <Container>
            <BoardActions />
            <MapWrapper>
                <GoogleApiWrapper containersContext={containersContext}/>
            </MapWrapper>
        </Container>
    );
};

export default MainBoard;
