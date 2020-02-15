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
            <Link to="/">
                <Logo src={logo} alt="Logo"/>
            </Link>
            <Navigation>
            <Option to='/stats'>
                    Statisctics
                </Option>
                <Option to='/dashboard'>
                    Dashboard
                </Option>
                <Option to='/profile'>
                    Profile
                </Option>
                <Option to='/signin'>
                    Sign in
                </Option>
            </Navigation>

        </HeaderContent>
    </HeaderContainer>
);

export default Header;