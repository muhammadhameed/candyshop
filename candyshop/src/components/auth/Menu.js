import React, { Component } from "react";
import s from  "../img/small.png";
import m from  "../img/medium.png";
import l from  "../img/large.png";
import bg from "../img/bgMenu.png";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "./api"
class Menu extends Component {
    state = 0

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            boxW: this.state
        }
        console.log("ud ",userData)

        api("auth/customer/login", userData, 200).then(res => {
            
            if (res.statusCode == 200) {
                window.localStorage.setItem('token', res.token);
                this.props.history.push("/home/customer");
                
            }
            else {
                alert("Error")
            }
        }
        ).catch(e => console.log(e))
    }
    render(){
        let text = "CLICK ON THE PREFERRED BOX TO FILL CANDIES :)"
        return(
               
            <div className="outBG">
                    <div className="tt">{text}</div>
                    <div id="menu-outer"  >
                        <div className="tableD" >
                            <ul id="horizontal-list" className="manualBg" >
                                <li className="space" ><a href='http://localhost:3000/menu160'><img src={s} /></a></li>
                                <li className="space"><a href='http://localhost:3000/menu320'><img src={m} /></a></li>
                                <li className="space"><a href='http://localhost:3000/menu500'><img src={l} /></a></li>
                            </ul>
                        </div>
                    </div>
            </div>        
                
        
    
        )
    }
    }

    export default Menu;