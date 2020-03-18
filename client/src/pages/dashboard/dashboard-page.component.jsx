import React, { useState, useEffect, useMemo } from 'react';

import FiltersContainer from '../../components/filters-container/filters-container.component';
import MainBoard from '../../components/main-board/main-board.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { SensorContext } from '../../contexts/sensor.context';

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

    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);
    const providerValue = useMemo(() => ({sensors, setSensors}), [sensors, setSensors]);

    useEffect(() => {
        const fetchSensors = async () => {
            const response = await axios.get("/api/container");
            setSensors(response.data);
            setLoading(false);
            console.log(response.data);
        }

        fetchSensors();
    }, []);

    return (
        <PageContainer>
            <SensorContext.Provider value={providerValue}>
                <PageHeading>
                    <ActionsTitle>
                        Dashboard actions:
                    </ActionsTitle>
                    <FiltersContainer />
                </PageHeading>
                <MainBoardWithSpinner isLoading={loading}>
                    
                </MainBoardWithSpinner>

            </SensorContext.Provider>
        </PageContainer>
    );
};

export default DashboardPage;
