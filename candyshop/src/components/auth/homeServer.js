import React, { Component } from "react";
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


class homeServer extends Component {
   


    render() {

        return (
            <div className="home-page_3">
            <div className="container main">
                <p className="brand-name">Welcome!</p>
              
                    <Link to = "/add-product">
                    <div className="btn-handler">
                        <Button className="signup-btn">Add Product
                        
                        </Button>
                    </div>
                    </Link>
                    {/* <Link to = "/menu"> */}
                    <div className="btn-handler">
                        <Button className="signup-btn">Orders
                        
                        </Button>
                    </div>
                    {/* </Link> */}
                   
  
                <Link to ="/change-password-admin">
                <div className="btn-handler">
                        <Button className="signup-btn">Change Password</Button>
                    </div>
                    </Link>
                    <Link to ="/change-admin-username">
                <div className="btn-handler">
                        <Button className="signup-btn">Change Username</Button>
                    </div>
                    </Link>
                    <Link to ="/login-admin">
                <div className="btn-handler">
                        <Button className="signup-btn">Sign Out</Button>
                    </div>
                    </Link>
                    
            
            </div>
        </div>
        
        
      
        )    
    }
}

export default homeServer;   