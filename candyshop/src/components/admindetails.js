import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';


class admindetails extends Component {
    state = {
        oldpassword: "",
        password: "",
        rePassword: "",
        errors: {}        
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
       
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">Admin Details</p>

    <table className ="centre">
        
        <thead>
            <tr>

                <th>Name</th>
                <th>Admin ID</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Muhammad</td>
                <td>2000</td>
            </tr>
            <tr>
                <td>Fahad</td>
                <td>10000</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>Asad</th>
                <td>12000</td>
            </tr>
        </tfoot>
    </table>

                </div>    
            </div>
        )
    }
}
export default admindetails;