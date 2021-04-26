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
        var totalinput = {orderNumber:item._id}
        
        fetch('http://localhost:4000/orders/pendingOrders/confirm',{
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(totalinput)
        }).then(function(response){
            response.text().then(function(text){window.location = "http://localhost:3000/view-orders/";});
            // if (response.status != 400)
            // {
            //     window.location = "http://localhost:3001/home-server/";
            // }
        }).then(() => {this.setState({ [item.accepted]: -1 });
        }).catch(function(error) {
            console.error(error);
            alert("Error");
        }) 
    }

    rejectOrder = (item) => {
        console.log(item)
         api("order-req/edit", { _id: item._id, accepted: -1 }, 200).then
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
        else if (e.accepted == 0)
            return (
                <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={(res) => {this.rejectOrder(e)}
                } style={{ color: "#2E5984" }} icon={faTimes} size="2x" /></button></td>);
        else
            return (<br />);
    };
    componentDidMount() {

        fetch('http://localhost:4000/orders/pendingOrders/',{
        method: 'get'
        }).then(function(response){
          return response.text();
        }).then(async function(text){
          console.log(JSON.parse(text))
          if (text == '[]')
          {
            alert('There are no pending orders to approve or deny.')
          }
          var data = JSON.parse(text)
          console.log(data[0])
          return data;
        }).then((res) => {this.setState({Orders: res});
                this.render()
            })
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
                        {this.state.Orders.map(i => {
                            return (<tr>
                                <td className="title-sm-b-s">{i._id}</td>
                                <td className="title-sm-b-s">{i.customerName}</td>
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