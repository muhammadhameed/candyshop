import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';

var api = require('./auth/api.js');
class ViewTrip extends Component {
    state = {
        trips: [{
            name: "hey",
            id: 121 ,
            description: "",
            itienrary: "",
            price:0,
            capacity:0,
            start_date: Date,
            end_date: Date,
            loc_ids:[]}],
            rejectTrip:this.rejectTrip,
            acceptTrip:this.acceptTrip,
            currentObj:{}
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }

        api.apiCallerWithoutToken("http://localhost:8080/api/trip/fetch", {},200).then(res=>  
        console.log(res)
        // this.setState({
        //     trips: res.trips
        // })
        )

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
        //api.apiCallerWithoutToken("http://localhost:8080/api/auth/admin/login", userData,200).then(res=>  window.localStorage.setItem('token', res.token))

    }
    acceptTrip = (item) => {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip-req/edit", {id:this.state.currentObj.id, accepted:true},200).then(res=>{console.log(res)})
    
    }
    
    rejectTrip = (item) => {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip-req/edit", {id:this.state.currentObj.id, accepted:false},200).then(res=>{console.log(res)})
    
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page" style={{marginLeft:'20px'}}>
            <div className="container main">
                
                <p className="brand-name">Trip Details</p>
            
            
                <table >
                    
                    <thead>
                    
                        <tr>
                            <th>Trip Name</th>
                            <th>Trip ID</th>
                            <th>ViewTrip</th>
                            <th>Trip Itienrary:</th>
                            <th>Trip Price</th>
                            <th>Trip capacity</th>
                            <th>Trip start date</th>
                            <th>Trip end date</th>
                            <th>Accept</th>
                            <th>Reject</th>


                        </tr>
                    </thead>
                    <tbody>
                    {this.state.trips.map(i=>{
                    // this.setState({
                    //     currentObj:i
                    // })
                     return (<tr>
                        <td>{i.name}</td>

                         <td>{i.id}</td>

                         <td>{i.description}</td>
                         <td>{i.itienrary}</td>
                         <td>{i.price}</td>
                         <td>{i.capacity}</td>
                         <td>{i.start_date}</td>
                         <td>{i.end_date}</td>
                         <td><button style={{backgroundColor:'green'}} onClick={this.state.acceptTrip}>Accept</button></td>
                         <td><button style={{backgroundColor: 'red'}} onClick={this.state.rejectTrip}>Reject</button></td>





                     </tr>)
;
                    })}
                        
                    </tbody>
                   
                </table>
                            

                

            </div>
            </div>
        )
    }
}
export default ViewTrip;