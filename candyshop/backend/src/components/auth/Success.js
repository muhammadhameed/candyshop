import React, { Component } from "react";
import { Link } from "react-router-dom";
import bg from "../img/Success.png";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"


class Success extends Component {
   


    render() {

        return (

            
          <container>
            <figure className="position-relative">
            <img src={bg} alt="bg" className="img-fluid"></img>
            </figure>
            
         
         </container>
        
        
      
        )    
    }
}

export default Success;   