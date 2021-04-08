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
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
        }
        const token = window.location.href.substring( window.location.href.lastIndexOf('=') + 1)
        window.localStorage.setItem('token', token);
        console.log(window.localStorage.getItem("token"))
        console.log("2",newUser)
        api('account/admin/signup', newUser, 200).then(res=>  
        {console.log(res)
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
        console.log("Here: ", errors);
        return (
            <div className="home-page">
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
                                must contain atleast 1 digit and 1 special character
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
