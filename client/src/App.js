import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import {userContext} from './contexts/user.context';

import Header from './components/header/header.component';
import HomePage from './pages/home/home-page.component';
import DashboardPage from './pages/dashboard/dashboard-page.component';
import RegistrationPage from './pages/registration/registration-page.component';
import StatisticsPage from './pages/statistics/statistics-page.component';
import ProfilePage from './pages/profile/profile-page.component';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    async componentDidMount() {
        let response = await axios.get('/api/current_user');
        await this.setState({ user: response.data });
    }

    render() {
        return (
            <userContext.Provider>
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
            </userContext.Provider>
        );
    }
}

export default App;
