import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import CustomButton from '../button/button.component';

import { HeaderContent,
    HeaderContainer,
    Navigation,
    Option,
    Logo } from './header.styles';
import { Context } from '../../state/store';


const Header = () => {

    const { user } = useContext(Context)[0];

    const logout = () => {
        window.location.href = '/api/auth/logout';
    };

    const logoutTheme = {
        hBorder: '1px solid rgba(0, 0, 0, .6)',
        backgroundColor: 'transparent',
        hBackgroundColor: 'rgba(0, 0, 0, .2)'
    };

    const getProfileName = () => (user.isAdmin ? 'Admin panel' : 'Profile');

    return (
        <HeaderContainer>
            <HeaderContent>
            <Link to="/">
                <Logo src={logo} alt="Logo" />
                </Link>
            { user ? (
                    <Navigation>
                <Option to="/stats">
                          Statistics
                    </Option>
                        <Option to="/dashboard">
                        Dashboard
                    </Option>
                <Option to="/profile">
                          {getProfileName()}
                        </Option>
                <CustomButton onClick={logout} theme={logoutTheme}>
                          Logout
                    </CustomButton>
              </Navigation>
                ) : (
                  <Navigation>
                      <Option to="/signin">
                          Sign in
                    </Option>
                    </Navigation>
                )}
          </HeaderContent>
      </HeaderContainer>
    );
};

export default Header;
