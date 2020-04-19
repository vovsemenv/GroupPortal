import React from 'react'
import {Nav, Container} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
function CustomNavBar(props) {
    
    return (
      <div style={{borderBottom:"1px black solid"}} className="mb-3">
        <Navbar bg="white" expand="lg">
            <Container>    
            <Link to="/">
            <Navbar.Brand href="#home">{props.title}</Navbar.Brand>
            </Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {[props.children]}
            </Nav>            
            </Navbar.Collapse>
            </Container>
        </Navbar>
      

      </div>
    );
  }
  export default CustomNavBar;