import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../contexts/user.context";

import logo from '../../assets/logo.png';
import CustomButton from '../button/button.component';

import {
    HeaderContent,
    HeaderContainer,
    LogoContainer,
    Navigation,
    Option,
    Logo
} from './header.styles';


const Header = () => {
    const { user, setUser } = useContext(UserContext);

    const logout = event => {
        window.location.href = '/api/logout';
    }

    const logoutTheme = {
        hBorder: '1px solid rgba(0, 0, 0, .6)',
        backgroundColor: 'transparent',
        hBackgroundColor: 'rgba(0, 0, 0, .2)'
    }
    
    return (
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
                    { user ?  (
                            <CustomButton onClick={logout} theme={logoutTheme}>
                                Logout
                            </CustomButton>
                        ) : (
                            <Option to='/signin'>
                                Sign in
                            </Option>
                        )
                    }
                    
                    
                </Navigation>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;