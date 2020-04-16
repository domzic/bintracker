import React, {useContext, useEffect} from 'react';
import {
    PageContainer
} from './statistics-page.styles';
import {Context} from "../../state/store";
import axios from "axios";
import {Actions} from "../../state/constants";
import {Bar} from "react-chartjs-2";

const chartBackgroundColors =  [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
];
const chartBorderColors = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

const StatisticsPage = () => {
    const [state, dispatch] = useContext(Context);
    const { containers } = state;
    useEffect(() => {
        const fetchContainers = async () => {
            const response = await axios.get('/api/container');
            dispatch({ type: Actions.SET_CONTAINERS, payload: response.data });
        };
        
        if (!state.containers.length) {
            fetchContainers();
        }
    }, []);
    
    const allContainers = [...containers.red, ...containers.yellow, ...containers.green];

    return (
        <PageContainer>
            <div>Your company has {allContainers.length} containers</div>
            <Bar
                data={{
                    labels: allContainers.map(c => c.ttnDeviceId),
                    datasets: [{
                        label: '# of times serviced',
                        barPercentage: 0.5,
                        data: allContainers.map(c => c.timesServiced),
                        backgroundColor: chartBackgroundColors,
                        borderColor: chartBorderColors
                    }]
                }}
                width={100}
                height={50}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </PageContainer>
    );
};

export default StatisticsPage;
