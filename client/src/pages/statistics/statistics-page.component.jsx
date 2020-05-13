import React, { useContext, useEffect, useState } from 'react';
import {
    TopStats,
    Header,
    PageContainer,
    StatCards,
    DoughnutWrapper,
    BarWrapper,
    Main,
    ButtonsContainer,
    View,
    Selection,
} from './statistics-page.styles';
import { Context } from '../../state/store';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import StatCard from '../../components/stat-card/stat-card.component';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

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

const ActiveTab = {
    PERCENTAGE: 'percentage',
    SERVICES: 'services',
    REPORTS: 'reports',
};

const StatisticsPage = () => {
    const [state, dispatch] = useContext(Context);
    const { containers, company, user } = state;
    const [activeTab, setActiveTab] = useState(ActiveTab.PERCENTAGE);
    const [monthly, setMonthly] = useState([]);
    const allContainers = [
        ...containers.red,
        ...containers.yellow,
        ...containers.green,
    ];

    useEffect(() => {
        async function fetchMonthly() {
            const { data } = await axios.get('/api/stat/monthly');
            setMonthly(data);
        }
    
        fetchMonthly();
    }, []);
    
    const calcPercentage = count =>
        Math.round((count / allContainers.length) * 100);

    const renderTab = tab => {
        switch (activeTab) {
            case ActiveTab.PERCENTAGE:
                return (
                    <DoughnutWrapper>
                        <Doughnut
                            data={{
                                labels: ['Green', 'Yellow', 'Red'],
                                datasets: [
                                    {
                                        label: 'Currently containers',
                                        barPercentage: 0.5,
                                        data: [
                                            calcPercentage(
                                                containers.green.length
                                            ),
                                            calcPercentage(
                                                containers.yellow.length
                                            ),
                                            calcPercentage(
                                                containers.red.length
                                            ),
                                        ],
                                        backgroundColor: doughnutColors,
                                        borderColor: doughnutColors,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                legend: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Containers distribution, %',
                                    fontSize: 18,
                                    fontColor: '#A9DAC4',
                                },
                            }}
                        />
                    </DoughnutWrapper>
                );
            case ActiveTab.SERVICES:
                return (
                    <BarWrapper>
                        <Bar
                            height={450}
                            gridLines={{
                                color: 'rgba(0, 0, 0, 0)',
                            }}
                            data={{
                                labels: allContainers.map(c => c.ttnDeviceId),
                                datasets: [
                                    {
                                        label: '# of times serviced',
                                        barPercentage: 0.5,
                                        data: allContainers.map(
                                            c => c.timesServiced
                                        ),
                                        backgroundColor: barColors,
                                    },
                                ],
                            }}
                            options={{
                                scales: {
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: true,
                                                color: '#81876E',
                                            },
                                            ticks: {
                                                fontColor: '#81876E',
                                            },
                                        },
                                    ],
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: false,
                                            },
                                            ticks: {
                                                fontColor: '#81876E',
                                            },
                                        },
                                    ],
                                },
                                maintainAspectRatio: false,
                                legend: {
                                    display: false,
                                },
                                title: {
                                    display: true,
                                    text: 'Containers services count',
                                    fontSize: 18,
                                    fontColor: '#A9DAC4',
                                },
                            }}
                        />
                    </BarWrapper>
                );
            case ActiveTab.REPORTS: {
                return (
                    <BarWrapper>
                        <Line
                            height={200}
                            data={{
                                labels: monthly.map(
                                    report => report.key
                                ),
                                datasets: [
                                    {
                                        label: 'Containers serviced',
                                        fill: false,
                                        borderColor: '#6FB984',
                                        data: monthly.map(
                                            report => report.value
                                        ),
                                        backgroundColor: '#6FB984',
                                    },
                                ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Containers serviced per month',
                                    fontColor: '#A9DAC4',
                                    fontSize: 18
                                },
                                legend: {
                                    display: false
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: true,
                                                color: '#81876E',
                                            },
                                            ticks: {
                                                fontColor: '#81876E',
                                                stepSize: 1,
                                                beginAtZero: true
                                            },
                                        },
                                    ],
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: true,
                                                color: '#81876E',
                                            },
                                            ticks: {
                                                fontColor: '#81876E',
                                                stepSize: 1,
                                            },
                                        },
                                    ],
                                }
                            }}
                        />
                    </BarWrapper>
                );
            }
        }
    };

    const handleTabClick = e =>
        setActiveTab(e.target.getAttribute('data-tabname'));

    const isActive = tab => (tab === activeTab ? 'active' : '');

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
                        value={company.employees.length}
                    />
                    <StatCard
                        backgroundImage="linear-gradient(to right, #96B836, #BBDE58)"
                        title="Random number"
                        value="64%"
                    />
                </StatCards>
            </TopStats>
            <Main>
                <ButtonsContainer>
                    <Selection
                        data-tabname={ActiveTab.PERCENTAGE}
                        className={isActive(ActiveTab.PERCENTAGE)}
                        onClick={handleTabClick}
                    >
                        Current distribution
                    </Selection>
                    <Selection
                        data-tabname={ActiveTab.SERVICES}
                        className={isActive(ActiveTab.SERVICES)}
                        onClick={handleTabClick}
                    >
                        Containers services
                    </Selection>
                    <Selection
                        data-tabname={ActiveTab.REPORTS}
                        className={isActive(ActiveTab.REPORTS)}
                        onClick={handleTabClick}
                    >
                        Monthly report
                    </Selection>
                </ButtonsContainer>
                <View>{renderTab(activeTab)}</View>
            </Main>
        </PageContainer>
    );
};

export default StatisticsPage;
