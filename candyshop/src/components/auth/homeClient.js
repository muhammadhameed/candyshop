import React, { Component } from "react";
import { Link } from "react-router-dom";
import bg from "../img/Home.png";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"


class homeClient extends Component {
   


    render() {

        return (

            
          <container>
            <figure className="position-relative">
            <img src={bg} alt="bg" className="img-fluid"></img>
            <figcaption>
            <Button className="orderNow-btn" onClick={() => {
                                this.props.history.push('/menu');
                            }}>Menu</Button>
            <Button className="orderNow-btn" onClick={() => {
                this.props.history.push('/login');
            }}>Sign Out</Button>
            </figcaption>
            </figure>
               
                
                            
                            
                       

                        


                    
                
         
         </container>
        
        
      
        )    
    }
}

export default homeClient;   