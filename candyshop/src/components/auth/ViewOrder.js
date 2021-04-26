import React, { Component } from 'react';
import axios from "axios"
import {
    Table
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

import api from "./api.js";
class ViewResponses extends Component {
    state = {
        Orders: [],
        rejectOrder: this.rejectOrder,
        acceptOrder: this.acceptOrder,
        currentObj: {}

    }
    acceptOrder = (item) => {
         api("order-req/edit", { id: item.id, accepted: 1 }, 200).then
         (res => {if(res.statusCode == 200)
         {  
            this.setState({ [item.accepted]: 1 })}
         else{
             alert("Error")
         }
        })
    }

    rejectOrder = (item) => {
        console.log(item)
         api("order-req/edit", { id: item.id, accepted: -1 }, 200).then
         (res => {if(res.statusCode == 200)
         {  
            this.setState({ [item.accepted]: -1 })}
         else{
             alert("Error")
         }
        })
    
    }
    if = (e) => {
        if (e.accepted == 1)
            return (<td className="title-sm-b-s">Accepted</td>);
        else if (e.accepted === 0)
            return (<td className="title-sm-b-s"><button onClick={()=>{this.acceptOrder(e)}}><FontAwesomeIcon  style={{ color: "#2E5984" }} icon={faCheck} size="2x" /></button></td>);
        else
            return (<br />);
    }
    if2 = (e) => {
        if (e.accepted == -1)
            return (<td className="title-sm-b-s">Rejected</td>);
        else if (e.accepted === 0)
            return (
                <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={(res) => {this.rejectOrder(e)}
                } style={{ color: "#2E5984" }} icon={faTimes} size="2x" /></button></td>);
        else
            return (<br />);
    };
    componentDidMount() {

        api("order-req/fetch", {
            tripID: window.location.href.substring(window.location.href.lastIndexOf('=') + 1)
        }, 200).then(
            (e) => {
                console.log(e)
                if (e.Orders !== []) {
                    this.setState({ Orders: e.Orders });
                }
            });
    }
    render() {

        return (
            <div className="home-page_1">
            <div className="container main">
                <p className="brand-name">CANDYSCAPE</p>
                <p className="title">Current Orders</p>
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">Responses</p>
                    <Table className="tablee" responsive >
                        <tr>
                            <th className="title-sm-b">Order ID</th>
                            <th className="title-sm-b">Customer ID</th>
                            <th className="title-sm-b">Number of Boxes:</th>
                            <th className="title-sm-b">Amount Due</th>
                            <th className="title-sm-b">Accept</th>
                            <th className="title-sm-b">Reject</th>
                        </tr>
                        {this.state.trips.map(i => {
                            return (<tr>
                                <td className="title-sm-b-s">{i.tripID}</td>
                                <td className="title-sm-b-s">{i.customerID}</td>
                                <td className="title-sm-b-s">{i.numberOfBoxes}</td>
                                <td className="title-sm-b-s">{i.amountDue}</td>
                                {this.if(i)}
                                {this.if2(i)}
                            </tr>);
                        })}
                    </Table>
                </div>
            </div>
            </div>
            </div>

        )
    }
}
export default ViewResponses;