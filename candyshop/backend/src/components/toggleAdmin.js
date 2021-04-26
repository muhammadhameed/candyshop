import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';


class toggleAdmin extends Component {
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
                    <p className="brand-name">Toggle Admin</p>

    <table className ="centre">
        
        <thead>
            <tr>

                <th>Evoke Permission</th>
                <th>Name</th>
                <th>Admin ID</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td><input type="checkbox" name="name1" />&nbsp;</td>
                <td>Muhammad</td>

                <td>2000</td>
            </tr>
            <tr>
            <td><input type="checkbox" name="name1" />&nbsp;</td>
                <td>Fahad</td>
                <td>10000</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
            <td><input type="checkbox" name="name1" />&nbsp;</td>
                <th>Asad</th>
                <td>12000</td>
            </tr>
        </tfoot>
    </table>
    <div>
    <button >
        Submit
        </button>
        </div>

                </div>    
            </div>
        )
    }
}
export default toggleAdmin;