import React, {useContext, useEffect} from 'react';
import {
    PageContainer,
    Header,
    CardsList
} from './statistics-page.styles';
import {Context} from "../../state/store";
import {Bar} from "react-chartjs-2";
import StatCard from "../../components/stat-card/stat-card.component";

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
    
    const allContainers = [...containers.red, ...containers.yellow, ...containers.green];
    
    return (
        <PageContainer>
            <Header>Company Statistics Overview</Header>
            <CardsList>
                <StatCard backgroundImage='linear-gradient(to right, #8B55FF, #995AFF)' title='Number of containers' value={allContainers.length}/>
                <StatCard backgroundImage='linear-gradient(to right, #0EBD4D, #3CD372)' title='Some other statistic' value='74%'/>
                <StatCard backgroundImage='linear-gradient(to right, #FDB059, #FFBB6C)' title='Number of employees' value={10}/>
            </CardsList>
            
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
