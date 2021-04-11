import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"

class CustomerForgotPassword extends Component {
    state = {
        email: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        var email = this.state.email;
        var totalinput = {email};
        
        fetch('http://localhost:5000/customers/forgotPassword',{
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(totalinput)
        }).then(function(response){
            response.text().then(function(text){alert(text);});
            if (response.status != 400)
            {
                window.location = "http://localhost:3000/home/";
            }
        }).catch(function(error) {
            console.error(error);
        })

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page_1">
                <div className="container main">
                    {/* <img src={ logo } alt={ "Logo" } /> */}
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
export default CustomerForgotPassword;