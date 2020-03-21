import React, { useContext } from 'react';

import GoogleApiWrapper from '../map/google-map.component';
import BoardActions from '../board-actions/board-actions.component';


import { Container,
    MapWrapper } from './main-board.styles';
import { Context } from '../../state/store';


const MainBoard = () => {

    const { containers } = useContext(Context)[0];

    return (
      <Container>
          <BoardActions />
          <MapWrapper>
              <GoogleApiWrapper containers={containers} />
            </MapWrapper>
        </Container>
    );
};

export default MainBoard;
