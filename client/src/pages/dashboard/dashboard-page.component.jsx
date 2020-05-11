import React, {useContext, useEffect} from 'react';

import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';

import { PageContainer,
    PageHeading,
    ActionsTitle } from './dashboard-page.styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BoardActions from "../../components/board-actions/board-actions.component";
import {Container, Right} from "../../components/main-board/main-board.styles";
import ContainersList from "../../components/containers-list/containers-list.component";
const DashboardPage = () => {

    const responsive = useMediaQuery('(max-width:768px)');

    return (
        <PageContainer>
    
            <BoardActions />
            <MainBoard/>
    
            <ContainersList/>
      </PageContainer>
    );
};

export default DashboardPage;
