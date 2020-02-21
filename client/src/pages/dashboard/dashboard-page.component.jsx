import React from 'react';

import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';

import {
    PageContainer,
    PageHeading,
    ActionsTitle,
    MainContent,
    MapContainer
} from './dashboard-page.styles';

const DashboardPage = () => (
    <PageContainer>
        <PageHeading>
            <ActionsTitle>
                Dashboard actions:
            </ActionsTitle>
            <FiltersContainer />
        </PageHeading>
        <MainBoard>

        </MainBoard>
    </PageContainer>
);

export default DashboardPage;