import React, { Component } from "react";
import { Link } from "react-router-dom";
import bg from "../img/Home.png";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import api from "./api"


class Home extends Component {
   


    render() {

        return (

            
          <container>
            <figure className="position-relative">
            <img src={bg} alt="bg" className="img-fluid"></img>
            <figcaption>
                <p></p>
                <p></p>
                <div className ="btn-handler" marginLeft="100px">
                {/* <li className="space" onClick={()=>this.setState(160)}><a href='http://localhost:3000/menu2'><img src={s} /></a></li> */}
            <div className ="btn-handler_1">
                <p></p>
            <Button className="orderNow-btn"  onClick={() => {
                                this.props.history.push('/login');
                            }}>ORDER NOW</Button>
                            </div>
                            </div>
            </figcaption>
            </figure>
               
                
                            
                            
                       

                        


                    
                
         
         </container>
        
        
      
        )    
    }
}

export default Home;   