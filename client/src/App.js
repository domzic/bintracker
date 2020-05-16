import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Context } from './state/store';
import Header from './components/header/header.component';
import HomePage from './pages/home/home-page.component';
import DashboardPage from './pages/dashboard/dashboard-page.component';
import RegistrationPage from './pages/registration/registration-page.component';
import StatisticsPage from './pages/statistics/statistics-page.component';
import ProfilePage from './pages/profile/profile-page.component';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Actions } from './state/constants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const App = () => {
    const [state, dispatch] = useContext(Context);

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    useEffect(() => {
        async function fetchInitData() {
            const fetchedUser = await axios.get('/api/auth/current_user');
            const response = await axios.get('/api/company');
            dispatch({type: Actions.SET_COMPANY, payload: response.data});
            if (fetchedUser.data) {
                dispatch({type: Actions.SET_USER, payload: fetchedUser.data});
                const response = await axios.get('/api/container');
                dispatch({
                    type: Actions.SET_CONTAINERS,
                    payload: response.data,
                });
            }
        }
        fetchInitData();
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Header />
                    <ToastContainer autoClose={1000} />
                    <div className="App__Content">
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route
                                exact
                                path="/signin"
                                render={() =>
                                    state.user ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <RegistrationPage />
                                    )
                                }
                            />
                            <Route
                                exact
                                path="/profile"
                                render={() =>
                                    state.user ? (
                                        <ProfilePage />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                            <Route
                                exact
                                path="/dashboard"
                                render={() =>
                                    state.user ? (
                                        <DashboardPage />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                            <Route
                                exact
                                path="/stats"
                                render={() =>
                                    state.user ? (
                                        <StatisticsPage />
                                    ) : (
                                        <Redirect to="/" />
                                    )
                                }
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
