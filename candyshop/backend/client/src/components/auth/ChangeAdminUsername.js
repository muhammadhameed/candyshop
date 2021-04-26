import React, { Component } from 'react';

import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"

class ChangeAdminUsername extends Component {
    state = {
        oldusername: "",
        password: "",
        newusername: "",
        errors: {}
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        var adminName = this.state.oldusername;
        var change = this.state.newusername;
        var whatToChange = "username";
        var totalinput = {adminName, whatToChange, change};
        
        fetch('http://localhost:5000/admin/update',{
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

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page_2">
                <div className="container main">
                    <p className="brand-name">CANDYSCAPE</p>
                    <p className="title">Change Username</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="text"
                                placeholder="Enter existing username"
                                onChange={this.onChange}
                                value={this.state.oldusername}
                                error={errors.oldusername}
                                id="oldusername"
                            />
                        </FormGroup>
                        <FormGroup className="password-container">

                            <Input
                                className="input-field"
                                type="text"
                                placeholder="New Username"
                                onChange={this.onChange}
                                value={this.state.newusername}
                                error={errors.newusername}
                                id="newusername"
                            />
                            <p></p>
                    
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
export default ChangeAdminUsername;