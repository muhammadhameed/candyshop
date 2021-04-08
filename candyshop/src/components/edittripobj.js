import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

class edittriipobj extends Component {
    state = {
        tripname: "hey",
        trip_id: 121 ,
        trip_description: "",
        trip_itienrary: "",
        trip_price:0,
        trip_capacity:0,
        trip_start_date: Date,
        trip_end_date:Date,
        trip_loc_ids:[]
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
        e.preventDefault();
        const userData = {
            oldpassword:this.state.oldpassword,
            newpassword: this.state.password
        }
    }

    render() {
        const { errors } = this.state;
        return (
            
            <div >
                <h1>What changes do you want to make?</h1>
                <h2><Label classname="eto">Trip Name: {this.state.tripname}</Label></h2>
                
                <h2><Input classname="eto">Trip ID: {this.state.trip_id}</Input></h2>
                <h2><Label classname="eto">Trip Description: {this.state.trip_description}</Label></h2>
                <h2><Label classname="eto">Trip Itienrary: {this.state.trip_itienrary}</Label></h2>
                <h2><Label classname="eto">Trip Price: {this.state.trip_price}</Label></h2>
                <h2><Label classname="eto">Trip Capacity: {this.state.trip_capacity}</Label></h2>
                <h2><Label classname="eto">Trip Start Date: {this.state.trip_start_date}</Label></h2>
                <h2><Label classname="eto">Trip End Date: {this.state.trip_end_date}</Label></h2>

                

                

            </div>
        )
    }
}
export default edittriipobj;