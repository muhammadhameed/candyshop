
import React, { Component } from "react";
import s from  "../img/small.png";
import m from  "../img/medium.png";
import l from  "../img/large.png";
import bg from "../img/bgMenu.png";
import { Container } from "reactstrap";
class Menu extends Component {
    
    render(){
        let text = "CLICK ON THE PREFERRED BOX :)"
        return(
               
            <div className="outBG">
                    <div className="tt">{text}</div>
                    <div id="menu-outer"  >
                        <div className="tableD" >
                            <ul id="horizontal-list" className="manualBg" >
                                <li className="space" value="160"><a href='http://localhost:3000/menu2'><img src={s} /></a></li>
                                <li className="space"><a href='http://localhost:3000/menu2'><img src={m} /></a></li>
                                <li className="space"><a href='http://localhost:3000/menu2'><img src={l} /></a></li>
                            </ul>
                        </div>
                    </div>
            </div>        
                
        
    
        )
    }
    }

    export default Menu;   