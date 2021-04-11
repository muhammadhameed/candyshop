import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"



class AdminLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        var email = this.state.email;
        var password = this.state.password;
        var totalinput = {email, password};
        fetch('http://localhost:5000/admin/signinadmin/',{
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(totalinput)
        }).then(function(response){
            response.text().then(function(text){alert(text);});
            if (response.status != 400)
            {
                window.location = "http://localhost:3000/home-server/";
            }
        }).catch(function(error) {
            console.error(error);
        })
    }

    render(props) {

        return (
            <div className="home-page_1">
                <div className="container main">
                    <p className="brand-name">CANDY SHOP</p>
                    <p className="title">Admin Login</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                            />
                        </FormGroup>
                        <FormGroup className="password-container">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                                id="password"x
                            />
                           

                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">LOGIN</Button>
                        </div>
                        <Link to="/registerAdmin" className="link">Sign-up</Link>
                        <Link to="/forgot-password-admin" className="link">Forgot Password? :(</Link>

                    </Form>
                </div>
            </div>
        )
    }
}

export default AdminLogin;   