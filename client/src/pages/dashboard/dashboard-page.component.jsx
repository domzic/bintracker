import React, {useContext, useEffect} from 'react';

import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';

import { PageContainer,
    PageHeading,
    ActionsTitle } from './dashboard-page.styles';
import { Context } from '../../state/store';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Actions} from "../../state/constants";

const DashboardPage = () => {

    const responsive = useMediaQuery('(max-width:768px)');

    return (
        <PageContainer>
        <PageHeading>
            {!responsive && (
            <ActionsTitle>
                  Actions
            </ActionsTitle>
            )}
            <FiltersContainer />
            </PageHeading>
        <MainBoard/>
      </PageContainer>
    );
};

export default DashboardPage;
