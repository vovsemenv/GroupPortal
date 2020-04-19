import React from 'react';
import logo from './logo.svg';
import './App.css';
import CustomNavBar from './Components/CustomNavBar'
import { Navbar, Nav, Card,CardColumns, Container } from 'react-bootstrap';
import CustomFooter from "./Components/CustomFooter"
import NewsCards from './Components/NewsCards'
import Students from './Components/Students'
import Schedule from './Components/Schedule'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './Components/Admin';
const dataBaseUrl = "http://localhost:3010"

function App() {
  return (
    <Router>
        <CustomNavBar title="Группа мечты" >
          
            <Nav.Link href="/news" active>Новости</Nav.Link>
            
            <Nav.Link href="/students" active>Студенты</Nav.Link>
            <Nav.Link href="/schedule" Active>Расписание</Nav.Link>
            
        </CustomNavBar>

        <Switch>
          
        <Route path="/students">
            <Students dataURL={dataBaseUrl}/>
          </Route>
          <Route exact path="/">
            <NewsCards dataURL={dataBaseUrl}/>
          </Route>
          <Route path="/news">
            <NewsCards dataURL={dataBaseUrl}/>
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/admin">
            <Admin dataURL={dataBaseUrl}>
            </Admin>
          </Route>
        </Switch>
        
        
    </Router>
  );
}

export default App;
