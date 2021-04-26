import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"

class ForgotAdminPassword extends Component {
    state = {
        email: "",
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        var email = this.state.email;
        var totalinput = {email};
        
        fetch('http://localhost:5000/admin/forgotPassword',{
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
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">CANDYSCAPE</p>
                    <p className="title">Forgot Password</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                            />
                            {/* <span className="red-text">{errors.email}</span> */}
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
export default ForgotAdminPassword;