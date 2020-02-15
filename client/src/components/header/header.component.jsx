import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import {
    HeaderContent,
    HeaderContainer,
    LogoContainer,
    Navigation,
    Option,
    Logo
} from './header.styles';


const Header = () => (
    <HeaderContainer>
        <HeaderContent>
            <Option to="/">
                <Logo src={logo} alt="Logo"/>
            </Option>
            <Navigation>
                <Option to='/dashboard'>
                    DASHBOARD
                </Option>
            </Navigation>

        </HeaderContent>
    </HeaderContainer>
);

export default Header;