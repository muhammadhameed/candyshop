import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"

class AdminRegister extends Component {
    // Can Add Constructor
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
        errors: {}

    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidUpdate(prevprops) {
        if (prevprops.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }
    onSubmit = e => {
        e.preventDefault();
        //const token = window.location.href.substring( window.location.href.lastIndexOf('=') + 1)
        //window.localStorage.setItem('token', token);
        //console.log(window.localStorage.getItem("token"))
        var email = this.state.email;
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var name = this.state.name;
        var password = this.state.password;
        var totalinput = {firstName, lastName, name, email, password};
        
        if (this.state.password === this.state.rePassword)
            fetch('http://localhost:4000/admin/signupadmin/',{
                method: 'post',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(totalinput)
            }).then(function(response){
                response.text().then(function(text){alert(text);});
                if (response.status != 400)
                {
                    window.location = "http://localhost:3001/login-admin/";
                }
            }).catch(function(error) {
                console.error(error);
            })
            
        else
            alert("Passwords do not Match!")
    }
    render() {
        const { errors } = this.state;
        console.log("Here: ", errors);
        return (
            <div className="home-page_1">
                <div className="container main">
                <p className="brand-name">CANDY SHOP</p>
                <p className="title">Admin Register</p>
                <Form className="reg-form mt-3" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                        error={errors.firstName}
                                        id="firstName"
                                    />
                        </FormGroup>
                        <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                        error={errors.lastName}
                                        id="lastName"
                                    />
                            
                        </FormGroup>
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
                                        type="text"
                                        placeholder="Email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                    />
                            
                        </FormGroup>
                        
                        <FormGroup className="password-container">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"

                            />
                            <p></p>
                            <Input
                                type="password"
                                placeholder="Re-enter your password"
                                onChange={this.onChange}
                                value={this.state.rePassword}
                                error={errors.rePassword}
                                id="rePassword"
                            />
                            <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 upper case and lowercase character
                            </div>
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">Sign Up</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
export default AdminRegister;
