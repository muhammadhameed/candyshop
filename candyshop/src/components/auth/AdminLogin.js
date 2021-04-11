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
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        api("auth/admin/login", userData, 200).then(res => {
            console.log(res);
            console.log(res.token)
            if (res.statusCode == 200) {
                window.localStorage.setItem('token', res.token);
                this.props.history.push("/home/admin");
                console.log(res)
            }
            else {
                alert("Error")
            }
        }
        )
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