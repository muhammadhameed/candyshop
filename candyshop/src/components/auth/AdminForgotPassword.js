import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
var api = require('./api');

class AdminForgotPassword extends Component {
    state = {
        email: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email
        }
        api("account/admin/forgot-password/req", userData,200).then(res=>  
        {   console.log(res)
            if(res.statusCode == 200)
            {  
            this.props.history.push("/login/admin"); 
            console.log(res)}
            else{
                alert("Error")
            }}
    )

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">CANDY SHOP</p>
                    <p className="title">Forgot Password</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                            />
                            <div className="pop-up">
                        Enter the email you used to sign up and a password-reset link will be emailed to you.
                        </div>
                        </FormGroup>
                        
                        <p className="text"></p>
                        <span>{errors.email}</span>
                        <div className="btn-handler">
                            <Button className="signup-btn">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
export default AdminForgotPassword;