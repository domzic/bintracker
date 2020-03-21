import React, { useEffect, useContext} from 'react';
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
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {Actions} from "./state/constants";

const App = () => {

    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        async function fetchUser() {
            const fetchedUser = await axios.get("/api/auth/current_user");
            dispatch({type: Actions.SET_USER, payload: fetchedUser.data});
        }

        fetchUser();
    }, [dispatch]);

    return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <ToastContainer
                        autoClose={2000}
                    />
                    <div className="App__Content">
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route exact path='/signin' render={() =>
                            state.user ? (<Redirect to='/' />) : (<RegistrationPage />)}
                        />
                        <Route exact path='/profile' render={() =>
                            state.user ? (<ProfilePage />) : (<Redirect to='/' />)}
                        />
                        <Route exact path='/dashboard' render={() =>
                            state.user ? (<DashboardPage />) : (<Redirect to='/' />)}
                        />
                        <Route exact path='/stats' render={() =>
                            state.user ? (<StatisticsPage />) : (<Redirect to='/' />)}
                        />

                    </Switch>
                    </div>
                </BrowserRouter>
            </div>
    );
};

export default App;
