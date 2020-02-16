import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from './contexts/user.context';

import Header from './components/header/header.component';
import HomePage from './pages/home/home-page.component';
import DashboardPage from './pages/dashboard/dashboard-page.component';
import RegistrationPage from './pages/registration/registration-page.component';
import StatisticsPage from './pages/statistics/statistics-page.component';
import ProfilePage from './pages/profile/profile-page.component';

const App = () => {
    const [ user, setUser ] = useState(null);
    const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);

    async function fetchUser() {
        const fetchedUser = await axios.get("/api/current_user");
        setUser(fetchedUser.data);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={providerValue}>
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <div className="App__Content">
                    <Switch>
                        <Route exact path='/' component={HomePage}></Route>
                        <Route exact path='/signin' component={RegistrationPage}></Route>
                        <Route exact path='/profile' component={ProfilePage}></Route>
                        <Route exact path='/dashboard' component={DashboardPage}></Route>
                        <Route exact path='/stats' component={StatisticsPage}></Route>
                    </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </UserContext.Provider>
    );
}

export default App;
