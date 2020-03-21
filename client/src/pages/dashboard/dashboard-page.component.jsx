import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { PageContainer,
    PageHeading,
    ActionsTitle } from './dashboard-page.styles';
import { Context } from '../../state/store';

const MainBoardWithSpinner = WithSpinner(MainBoard);

const DashboardPage = () => {

    const [state, dispatch] = useContext(Context);
    const { containers } = state;

    const [loading, setLoading] = useState(!containers.length);

    useEffect(() => {
        const fetchContainers = async () => {
            const response = await axios.get('/api/container');
            dispatch({ type: 'SET_CONTAINERS', payload: response.data });
            setLoading(false);
        };

        if (!containers.length) {
            fetchContainers();
        }
    }, [containers, dispatch]);

    return (
        <PageContainer>
        <PageHeading>
            <ActionsTitle>
                  Dashboard actions:
                    </ActionsTitle>
            <FiltersContainer />
            </PageHeading>
        <MainBoardWithSpinner isLoading={loading} />
      </PageContainer>
    );
};

export default DashboardPage;
