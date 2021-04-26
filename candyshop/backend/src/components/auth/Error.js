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


class Error extends Component {
   


    render() {

        return (

            
          <div className = "home-page_2">
            
            <div className ="title" margintop = "40%">Some Error Occured! :(</div>
            
         
                
                            
                            
                       

                        


                    
                
         
         </div>
        
        
      
        )    
    }
}

export default Error;   