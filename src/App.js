import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import Snippet from './components/Snippet';

import {BrowserRouter as Router, Route} from 'react-router-dom';

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
      <AppNavbar/>
      <Route path='/snippet'>
        {lessons && <Snippet lessons={lessons}/>}
      </Route>
      
    </div>
    </Router>
  );
}

export default App;
