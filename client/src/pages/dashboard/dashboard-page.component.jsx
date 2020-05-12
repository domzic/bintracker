import React from 'react';

import MainBoard from '../../components/main-board/main-board.component';

import { PageContainer} from './dashboard-page.styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BoardActions from "../../components/board-actions/board-actions.component";
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
