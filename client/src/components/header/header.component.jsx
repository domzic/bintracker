import React from 'react';
import { Link } from 'react-router-dom';
import {
    HeaderContent,
    HeaderContainer,
    LogoContainer,
    Navigation,
    Option
} from './header.styles';


const Header = () => (
    <HeaderContainer>
        <HeaderContent>
            <LogoContainer to="/">
                <div className='logo' />
            </LogoContainer>
            <Navigation>
                <Option to='/shop'>
                    SHOP
                </Option>
                <Option to='/shop'>
                    CONTACT
                </Option>
            </Navigation>

        </HeaderContent>
    </HeaderContainer>
);

export default Header;