import React, { Component } from 'react';
import { Link } from "react-router-dom"
import {
    Row
} from 'reactstrap';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            type: props.type,
            startDate: props.startDate,
            endDate: props.endDate,
            link:props.link,
            Description:props.Description
            
        }
    }
    render() {
        return (
            <Link to={this.state.link} id={this.state.name} className={"tab-".concat(this.state.type)}>
                <p className="tab-text">{this.state.name}</p>
                <p className="tab-text-below">From: {this.state.startDate}</p> 
                <p className="tab-text-below-2">To: {this.state.endDate}</p>
                <p className="tab-text-below-3">{this.state.Description}</p>
            </Link>
        );
    }
}

export default Tab;