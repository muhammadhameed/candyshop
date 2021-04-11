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
        const userData = {
            oldPassword: this.state.oldpassword,
            newPassword: this.state.password
        }
        api("account/customer", userData, 200).then(res => {
            if (res.statusCode == 200) {
                this.props.history.push("/home/customer");
                console.log(res)
            }
            else {
                alert("Error")
            }
        }
        )
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