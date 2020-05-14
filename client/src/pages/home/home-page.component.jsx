import React, {useContext} from 'react';
import logo from '../../assets/logo.png';
import {
    PageContainer
} from './home-page.styles';
import {Context} from "../../state/store";

const HomePage = () => {
 
    const { company } = useContext(Context)[0];
    return (
        <PageContainer>
            <h2>Welcome to <br/> <img src={logo}/></h2>
            {company ? (
            <h4>Your company is "{company.name}"</h4>
            ) : null}
        </PageContainer>
    );
};

export default HomePage;
