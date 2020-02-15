import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/home/home-page.component';
import SignInPage from './pages/signin/signin-page.component';
import DashboardPage from './pages/dashboard/dashboard-page.component';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <div className="App__Content">
                    <Switch>
                        <Route exact path='/' component={HomePage}></Route>
                        <Route exact path='/dashboard' component={DashboardPage}></Route>
                    </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
