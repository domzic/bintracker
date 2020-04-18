import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import CustomButton from '../button/button.component';
import {
    HeaderContent,
    HeaderContainer,
    Navigation,
    Option,
    Logo,
    DropdownOption
} from './header.styles';
import { Context } from '../../state/store';
import { Actions } from '../../state/constants';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';

const Header = () => {
    const [state, dispatch] = useContext(Context);
    const { user } = state;
    const [anchorEl, setAnchorEl] = useState(null);
    const responsive = useMediaQuery('(max-width:768px)');
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        axios.get('/api/auth/logout');
        dispatch({ type: Actions.SET_COMPANY, payload: null });
        dispatch({ type: Actions.SET_USER, payload: null });
    };

    const logoutTheme = {
        hBorder: '1px solid rgba(0, 0, 0, .6)',
        backgroundColor: 'transparent',
        hBackgroundColor: 'rgba(0, 0, 0, .2)',
    };

    const renderHeader = () => (
        <Navigation>
            <Option to="/stats">Statistics</Option>
            <Option to="/dashboard">Dashboard</Option>
            <Option to="/profile">Account</Option>
            <CustomButton onClick={logout} theme={logoutTheme}>
                Logout
            </CustomButton>
        </Navigation>
    );

    const renderResponsiveHeader = () => (
        <Navigation>
            <Option onClick={handleClick}>Navigation</Option>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <DropdownOption to="/stats">Statistics</DropdownOption>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DropdownOption to="/dashboard">Dashboard</DropdownOption>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DropdownOption to="/profile">Account</DropdownOption>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <DropdownOption onClick={logout}>
                        Logout
                    </DropdownOption>
                </MenuItem>
            </Menu>
        </Navigation>
    );

    return (
        <HeaderContainer>
            <HeaderContent>
                <Link to="/">
                    <Logo src={logo} alt="Logo" />
                </Link>
                {user ? (
                    responsive ? (
                        renderResponsiveHeader()
                    ) : (
                        renderHeader()
                    )
                ) : (
                    <Navigation>
                        <Option to="/signin">Sign in</Option>
                    </Navigation>
                )}
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
