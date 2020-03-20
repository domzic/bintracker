import React, { useState, useEffect, useMemo } from 'react';

import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { ContainerContext } from "../../contexts/container.context";

import axios from 'axios';

import {
    PageContainer,
    PageHeading,
    ActionsTitle,
    MainContent,
    MapContainer
} from './dashboard-page.styles';

const MainBoardWithSpinner = WithSpinner(MainBoard);

const DashboardPage = () => {

    const [containers, setContainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const providerValue = useMemo(() => ({containers, setContainers}), [containers, setContainers]);

    useEffect(() => {
        const fetchContainers = async () => {
            const response = await axios.get("/api/container");
            setContainers(response.data);
            setLoading(false);
            console.log(response.data);
        };

        fetchContainers();
    }, []);

    return (
        <PageContainer>
            <ContainerContext.Provider value={providerValue}>
                <PageHeading>
                    <ActionsTitle>
                        Dashboard actions:
                    </ActionsTitle>
                    <FiltersContainer />
                </PageHeading>
                <MainBoardWithSpinner isLoading={loading}/>
            </ContainerContext.Provider>
        </PageContainer>
    );
};

export default DashboardPage;
