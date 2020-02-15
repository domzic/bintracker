import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';

class App extends React.Component {

  render() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="App__Content">
                <Switch>
                    <Route exact path='/' component={HomePage} />
                </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
