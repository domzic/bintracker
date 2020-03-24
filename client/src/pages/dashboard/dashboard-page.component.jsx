import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { PageContainer,
    PageHeading,
    ActionsTitle } from './dashboard-page.styles';
import { Context } from '../../state/store';
import { Actions } from '../../state/constants';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const MainBoardWithSpinner = WithSpinner(MainBoard);

const DashboardPage = () => {

    const [state, dispatch] = useContext(Context);
    const { containers } = state;

    const responsive = useMediaQuery('(max-width:768px)');
    const [loading, setLoading] = useState(!containers.length);

    useEffect(() => {
        const fetchContainers = async () => {
            const response = await axios.get('/api/container');
            console.log(response.data);
            dispatch({ type: Actions.SET_CONTAINERS, payload: response.data });
            setLoading(false);
        };

        if (!containers.length) {
            fetchContainers();
        }
    }, []);

    return (
        <PageContainer>
        <PageHeading>
            {!responsive && (
            <ActionsTitle>
                  Actions:
            </ActionsTitle>
            )}
            <FiltersContainer />
            </PageHeading>
        <MainBoardWithSpinner isLoading={loading} />
      </PageContainer>
    );
};

export default DashboardPage;
