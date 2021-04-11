import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"



class CustomerLogin extends Component {
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
        fetch('http://localhost:7000/customers/signin/',{
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(totalinput)
        }).then(function(response){
            response.text().then(function(text){alert(text);});
            if (response.status != 400)
            {
                window.location = "http://localhost:3000/menu/";
            }
        }).catch(function(error) {
            console.error(error);
        })
    }

    render() {

        return (
            <div className="home-page_1">
                <div className="container main">
                    <p className="brand-name">Candy Scape</p>
                    <p className="title">Customer Login</p>
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
                                id="password"
                            />
                        </FormGroup>
                        <div className="btn-handler">
                            <Link to="/forgot-password" className="link" style={{ marginleft: "14%" }}>Forgot Password? :(</Link>
                        </div>
                        <div className="btn-handler">
                            <Button className="signup-btn"
                            >LOGIN</Button>

                            <Button className="signup-btn" onClick={() => {
                                this.props.history.push('/register/');
                            }}>SIGNUP</Button>
                        </div>
                        <div className="btn-handler">
                            <Link to="/login-admin" className="link">Login as Admin</Link>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default CustomerLogin;   