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
class ViewFinance extends Component {
    state = {
        financesMonthly: "res.somethingelse",
        financesYearly: "res.something"
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }

        api.apiCallerWithoutToken("http://localhost:8080//api/finance/monthly", {},200).then(res=>  
        
        this.setState({
            financesMonthly: res
        })
        )
        
        api.apiCallerWithoutToken("http://localhost:8080//api/finance/yearly", {},200).then(res=>  
        
        this.setState({
            financesYearly: res
        })
        )
    }

     render() {
        return (
            <div className="home-page" style={{marginLeft:'20px', color:'white'}}>
            <div className="container main">
                
                <p className="brand-name">View Finances</p>
                <div style={{marginLeft:'0px'}}>
                <h1>
                    Monthly Finances
                </h1>
                </div>
                <div style={{marginLeft:'100px'}}>
                    <h2>
                        {this.state.financesMonthly}
                    </h2>
                </div>
                <div style={{marginLeft:'0px'}}>
                <h1>
                    Yearly Finances
                </h1>
                </div>
                <div style={{marginLeft:'100px'}}>
                    <h2>
                        {this.state.financesYearly}
                    </h2>
                </div>
                
            
            
             
                

            </div>
            </div>
        )
    }
}
export default ViewFinance;