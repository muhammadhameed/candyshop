import React, { Component } from 'react';
import {
} from 'reactstrap';
import Tab from './Tab';
import api from "./api"

class OrderList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            Orders: [],
            form: '',
            id: this.props.id,
            name: this.props.name,
            price: this.props.price,
           
        }
    }
    componentDidMount(){
        const orgObj = {
            startDate: new Date(),
            id: this.id,
            name: this.name,
            price: this.price,

        };
        let copyObj = {};
        let keysToCopy = Object.keys(orgObj);
        for (let k of keysToCopy) {
            if (orgObj[k] !== "" && orgObj[k] !== 0) {
                copyObj[k] = orgObj[k];
            }
        }
        api("orders/fetch", copyObj , 200).then(
          (e) => {
            if (e.Orders !== []) {
              this.setState({ trips: e.Orders });
              this.render()
            }
          });
      }
    render() {
        const url = "/home/trips/customer";
        const urlTab = "/trips/customer?=";
        const trips = this.state.trips.map((trip,index) =>
            <Tab name={ trip.name } startDate={trip.startDate} endDate={trip.endDate} key={index} link={ urlTab.concat(trip.id.toString())} Description={trip.description}  type="large" />
            
        );
        return (
            <div className="next-layer mt-4">
                <div className="main-container">
                    { trips }
                </div>
            </div>
        );
    }
}

export default OrderList


