import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import Snippet from './components/Snippet';
import SplashPage from './components/SplashPage';
import TeacherDashboard from './components/TeacherDashboard';
import NewLesson from './components/NewLesson';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



const App = () => {


  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/dashboard">
            <TeacherDashboard />
          </Route>
          <Route path="/newlesson">
            <NewLesson />
          </Route>
          <Route path="/snippet/:snippetId" render={({routerProps}) => <Snippet {...routerProps}/>}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
