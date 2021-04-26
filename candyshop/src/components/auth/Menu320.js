
import React, { Component } from "react";
import s from  "../img/small.png";
import m from  "../img/medium.png";
import l from  "../img/large.png";
import bg from "../img/bgMenu.png";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "./api";
import sl from  "../img/SugaredLemons.jpeg";
import ab from  "../img/i01_appleBelts.jpeg";
import sb from  "../img/i01_strawberryBelts.jpeg";
import cb from  "../img/i01_colaBelts (1).jpeg";
import al from  "../img/i01_assortedLollipops.jpeg";
import tm from  "../img/i01_WhatsApp Image 2021-04-10 at 3.50.55 PM.jpeg";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
const Hi3 = () => {
    const allowedW=320
    const [checkDown, setCheckDown] = React.useState(0)
    const [message, setMessage] = React.useState(``)
    const [message1, setMessage1] = React.useState(``)
    const [message2, setMessage2] = React.useState(``)
    const [message3, setMessage3] = React.useState(``)
    const [message4, setMessage4] = React.useState(``)
    const [message5, setMessage5] = React.useState(``)
    const [order, setOrder] = React.useState(``)
    const [status, setStatus] = React.useState(``)
    const [tw, setTw] = React.useState(0)
    const mystyle = {
        width: 400,
        backgroundColor: "pink",
      
      };
      const formSubmit = async (ev) => {
        ev.preventDefault()
        const clientMessage = {
            order: order,
            weight: parseInt(message)
        }
        console.log("hey ",clientMessage)
        //send to backend
        setTw(tw+parseInt(message))
        setMessage(``)
    }
      const messageChange1 = (ev) => {
        setMessage1(ev.target.value)
    }
    const formSubmit1 = async (ev) => {
        ev.preventDefault()
        const clientMessage = {
            order: order,
            weight: parseInt(message1)
        }
        console.log("hey ",clientMessage)
        //send to backend
        setTw(tw+parseInt(message1))
        setMessage1(``)
    }
      const messageChange = (ev) => {
        setMessage(ev.target.value)
    }
    
    const handleClick = (event) => {
        setOrder(event.target.id)
    }
    const clickConfirm = (event) =>{
        setStatus("Processed. Your order will be delivered soon. ")
    }
    return (

      

<div style={{backgroundColor: "purple"}}>

<div class="row" >
  <div class="col-sm-4"  >
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={sl} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Sugared Lemons</h5>
                <p className="card-text">A perfect combination of candy sweetness, lemon acidity and soda fizz!</p>
        <form onSubmit={formSubmit}>
                <input type='text' placeholder="Preferred weight? (g)" value={message} onChange={messageChange} />   
                <input type='submit' id='Sugared Lemons' onClick={handleClick}/>
            {
               
            }
            
        </form>
              

             </div>
        </div>
    </div>
  </div>
  
    <div class="col-sm-4"  >
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={ab} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Apple belts</h5>
                <p className="card-text">Sweet, chewy apples that give you a perfect organic aroma and soothing taste of nature!</p>
        <form onSubmit={formSubmit1}>
                <input type='text' placeholder="Preferred weight? (g)" value={message1} onChange={messageChange1} />   
                <input type='submit' id='Apple belts' onClick={handleClick}/>
            {
               
            }
            
        </form>
              

             </div>
        </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={sb} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Strawberry belts</h5>
                <p className="card-text">Delicious long belts with a strawberry flavouring. We got you covered! </p>
                <input type='text' placeholder="Preferred weight? (g)" value='' />   
                <input type='submit' />
            {
               //send message 
            }

             </div>
        </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={cb} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Cola belts</h5>
                <p className="card-text">A perfect answer to your cola craving. Say no more. We are here for you!</p>
                <input type='text' placeholder="Preferred weight? (g)" value='' />   
                <input type='submit' />
            {
               //send message 
            }

             </div>
        </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={al} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Assorted Lollipops</h5>
                <p className="card-text">Who doesn't love delicious assorted lollipops with a plethora of flavors?</p>
                <input type='text' placeholder="Preferred weight? (g)" value='' />   
                <input type='submit' />
            {
               //send message 
            }

             </div>
        </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={tm} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Twist Mallows</h5>
                <p className="card-text"> Gluten free swirls that make for a perfect sweet treat. Enjoy! </p>
                <input type='text' placeholder="Preferred weight? (g)" value='' />   
                <input type='submit' />
            {
               //send message 
            }

             </div>
        </div>
    </div>
  </div>
  
</div>
<div className="text_box"> {`Max weight allowed: ${allowedW} g`}</div>     
<div className="text_box"> {`Your total weight: ${tw} g`}</div>
<div className="text_box"> {`Order status: ${status}`}</div>
<div className="pdd">
<button type="button" className="btn btn-secondary" onClick={clickConfirm} >Confirm order</button>
</div>
</div>        
    

    )
}
class Menu320 extends Component {
    
    render(){
        
        return(
               
                <Hi3/>
        
    
        )
    }
    }

    export default Menu320;   


    