import React from 'react';
import logo from '../../assets/logo.png';
import {
    PageContainer
} from './home-page.styles';

const HomePage = () => (
    <PageContainer>
        <h3>Welcome to <br/> <img src={logo}/></h3>
    </PageContainer>
);

export default HomePage;
