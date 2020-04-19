import React from 'react'
import {Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import "./CustomFooter.css"

function CustomFooter(props) {
    
    return (
      
        <Navbar className="Footer mt-3" bg="white" expand="lg">
            <Navbar.Brand className="Footer Title" href="#home">{props.title}</Navbar.Brand>
            
        </Navbar>
      
    );
  }
  export default CustomFooter;