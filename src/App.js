import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import { ListGroupItemHeading } from 'reactstrap';

const App = () => {
  const API_URL = 'http://localhost:5000'

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    console.log('load')
    loadLessons();
  }, []) //put things in this array if you want other triggers to cause useEffect to execute

  const loadLessons = async () => {
    const response = await fetch(`${API_URL}/snippets`)
    const data = await response.json();
    setLessons(data)
  }
  return (
    <div className="App">
      <AppNavbar/>
      <h1>hi</h1>
    </div>
  );
}

export default App;
