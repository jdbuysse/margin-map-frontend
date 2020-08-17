import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import Snippet from './components/Snippet';
import SplashPage from './components/SplashPage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard';

const App = () => {
  const API_URL = 'http://localhost:5000'

  const [lessons, setLessons] = useState();

  useEffect(() => {
    fetch(`${API_URL}/snippets`)
      .then(response => response.json())
      .then(data => {
        setLessons(data)
      })
  }, [])


  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Route path='/'>
        </Route>
        <Route path='/dashboard'>
        </Route>
        <Route path='/snippet'>
        </Route>
        {/* <Route exact path="/snippet/:snippetId">
          {lessons && <Snippet lessons={lessons}/>}
        </Route> */}

        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/dashboard">
            <TeacherDashboard />
          </Route>
          <Route path="/snippet">
            {lessons && <Snippet lessons={lessons} />}
          </Route>
          {/* <Route exact path="/snippet/:snippetId">
            {lessons && <Snippet lessons={lessons} />}
          </Route> */}
        </Switch>



      </div>
    </Router>
  );
}

export default App;
