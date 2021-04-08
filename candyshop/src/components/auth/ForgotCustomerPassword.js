import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"

class ForgotCustomerPassword extends Component {
    state = {
        password : "",
        rePassword: "",
        errors: {}        
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            password: this.state.password
        }
        const token = window.location.href.substring( window.location.href.lastIndexOf('=') +1)
        window.localStorage.setItem('token', token)
        if(this.state.password === this.state.rePassword)
        api("account/customer/forgot-password/res", userData,200).then(res=>  
        {   
            if(res.statusCode == 200)
            {  this.props.history.push("/login"); 
            }
            else{
                alert("Error")
            }})
        else
        {alert("Passwords do not match")}

    }

    render() {
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">CANDY SHOP</p>
                    <p className="title">Change Password</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        
                        <FormGroup className="password-container">
                            
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Enter new password" 
                                onChange={this.onChange}
                                value={this.state.password} 
                                id="password"
                                />
                            <p></p>
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Confirm new password" 
                                onChange={this.onChange}
                                value={this.state.rePassword} 
                                id="rePassword"
                                />
                            <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 digit and 1 special character
                            </div>
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">Confirm</Button>
                        </div>
                    </Form>
                </div>    
            </div>
        )
    }
}
export default ForgotCustomerPassword;