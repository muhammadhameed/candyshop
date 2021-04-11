import React, { Component } from "react";
// import Toolbar from "./node_modules"

import { Link } from "react-router-dom";
// import bg from "../img/Home.png";
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

            <div className="home-page_3">
            <div className="container main">
                <p className="brand-name">Welcome!</p>
          
                    <Link to = "/menu">
                    <div className="btn-handler">
                        <Button className="signup-btn">Menu
                        
                        </Button>
                    </div>
                    </Link>
                    <Link to = "menu2">
                <div className="btn-handler">
                    <Button className="signup-btn">Cart</Button>
                </div>
                </Link>
                <Link>
                <div className="btn-handler">
                    <Button className="signup-btn">Reviews</Button>
                </div>
                </Link>
                <Link to ="/change-password-admin">
                <div className="btn-handler">
                        <Button className="signup-btn">Change Password</Button>
                    </div>
                    
                    </Link>
                    <Link to ="/change-customer-username">
                <div className="btn-handler">
                        <Button className="signup-btn">Change Username</Button>
                    </div>
                    </Link>
                    <Link to ="/login">
                
                  <div className="btn-handler">
                        <Button className="signup-btn">Sign Out</Button>
                    </div>
                    </Link>
            
            </div>
        </div>

        
        
        
      
        )    
    }
}

export default homeClient;   