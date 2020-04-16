import React, { useContext } from 'react';
import {
    TopStats,
    Header,
    PageContainer,
    StatCards,
    DoughnutWrapper,
    BarWrapper
} from './statistics-page.styles';
import { Context } from '../../state/store';
import { Bar, Doughnut } from 'react-chartjs-2';
import StatCard from '../../components/stat-card/stat-card.component';

const barColors = [
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
    'rgba(255, 159, 64, 1)',
];

const doughnutColors = ['#78CA2F', '#EDDF4E', '#FF7575'];

const StatisticsPage = () => {
    const [state, dispatch] = useContext(Context);
    const { containers } = state;

    const allContainers = [
        ...containers.red,
        ...containers.yellow,
        ...containers.green,
    ];

    const calcPercentage = count =>
        Math.round((count / allContainers.length) * 100);
    return (
        <PageContainer>
            <Header>Company Statistics Overview</Header>
            <TopStats>
                <StatCards>
                    <StatCard
                        backgroundImage="linear-gradient(to right, #8B55FF, #995AFF)"
                        title="Number of containers"
                        value={allContainers.length}
                    />
                    <StatCard
                        backgroundImage="linear-gradient(to right, #FDB059, #FFBB6C)"
                        title="Number of employees"
                        value={10}
                    />
                </StatCards>
                <DoughnutWrapper>
                    <Doughnut
                        data={{
                            labels: ['Green', 'Yellow', 'Red'],
                            datasets: [
                                {
                                    label: 'Currently containers',
                                    barPercentage: 0.5,
                                    data: [
                                        calcPercentage(containers.green.length),
                                        calcPercentage(containers.yellow.length),
                                        calcPercentage(containers.red.length),
                                    ],
                                    backgroundColor: doughnutColors,
                                    borderColor: doughnutColors,
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false,
                        }}
                    />
                </DoughnutWrapper>
            </TopStats>
            <BarWrapper>
                <Bar
                    data={{
                        labels: allContainers.map(c => c.ttnDeviceId),
                        datasets: [
                            {
                                label: '# of times serviced',
                                barPercentage: 0.5,
                                data: allContainers.map(c => c.timesServiced),
                                backgroundColor: barColors,
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
            </BarWrapper>
        </PageContainer>
    );
};

export default StatisticsPage;
