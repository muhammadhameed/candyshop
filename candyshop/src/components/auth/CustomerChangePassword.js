import React, { Component } from 'react';

import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"

class ChangeCustomerPassword extends Component {
    state = {
        oldpassword: "",
        password: "",
        rePassword: "",
        errors: {}
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        var customerName = this.state.name;
        var change = this.state.password;
        var whatToChange = "password";
        var oldPassword = this.state.oldpassword;
        var totalinput = {customerName, whatToChange, change, oldPassword};
        
        if (this.state.password === this.state.rePassword)
            fetch('http://localhost:5000/customers/update',{
                method: 'post',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(totalinput)
            }).then(function(response){
                response.text().then(function(text){alert(text);});
                if (response.status != 400)
                {
                    window.location = "http://localhost:3000/home-client/";
                }
            }).catch(function(error) {
                console.error(error);
            })
            
        else
            alert("Passwords do not Match!")
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page_2">
                <div className="container main">
                    <p className="brand-name">CANDY SHOP</p>
                    <p className="title">Change Password</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Username"
                                onChange={this.onChange}
                                value={this.state.name}
                                id="name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="password"
                                placeholder="Enter old password"
                                onChange={this.onChange}
                                value={this.state.oldpassword}
                                error={errors.oldpassword}
                                id="oldpassword"
                            />
                        </FormGroup>
                        <FormGroup className="password-container">

                            <Input
                                className="input-field"
                                type="password"
                                placeholder="Enter new password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                            />
                            <p></p>
                            <Input
                                className="input-field"
                                type="password"
                                placeholder="Confirm new password"
                                onChange={this.onChange}
                                value={this.state.rePassword}
                                error={errors.rePassword}
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
export default ChangeCustomerPassword;