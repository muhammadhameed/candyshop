import React, { Component } from "react";
import s from  "../img/small.png";
import m from  "../img/medium.png";
import l from  "../img/large.png";
import bg from "../img/bgMenu.png";
import { Link } from "react-router-dom";

import Modal1 from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import api from "./api";
import sl from  "../img/SugaredLemons.jpeg";
import ab from  "../img/i01_appleBelts.jpeg";
import sb from  "../img/i01_strawberryBelts.jpeg";
import cb from  "../img/i01_colaBelts (1).jpeg";
import al from  "../img/i01_assortedLollipops.jpeg";
import tm from  "../img/i01_WhatsApp Image 2021-04-10 at 3.50.55 PM.jpeg";
const Hi2 = () => {
    const allowedW=320
    const totalBill=950
    const [checkDown, setCheckDown] = React.useState(0)
    const [message, setMessage] = React.useState({
        Address: "",Sugared9Lemons: "", Apple9Belts: "", Strawberry9Belts: "", Cola9Belts: "", Assorted9Lollipops: "", Twist9Mallows: ""
    })
    const [promo, setPromo]=React.useState('')
    const [order, setOrder] = React.useState(``)
    const [status, setStatus] = React.useState(``)
    const [tw, setTw] = React.useState(0)
    const [list, setList]=React.useState([])
    const [weight, setWeight]=('')
    const mystyle = {
        width: 400,
        backgroundColor: "pink",
      
      };
      const [weightE,setWeightE]=React.useState(0)

      const formSubmit = async (ev) => {
        ev.preventDefault()
        console.log("what?", message[ev.target.id])
        if (message[ev.target.id]!="" && tw+parseInt(message[ev.target.id])<=allowedW ){
            setTw(tw+parseInt(message[ev.target.id]))
            list.push([parseInt(message[ev.target.id]), ev.target.id.replace("9"," ") ])
            setList(list)
            setMessage({[ev.target.id]: ""})
        }
        else if (tw+parseInt(message[ev.target.id])>allowedW){
          setWeightE(1)
          setMessage({[ev.target.id]: ""})
        } 
        else{
          setMessage({[ev.target.id]: ""})
        }
        
        
       
    }
      const messageChange = (ev) => {
        
        let idd=ev.target.id
        console.log("idBMC: ",idd)
        console.log("iddMC: ", message.Sugared9Lemons)
        console.log("iddAMC: ", message[ev.target.id])
        console.log("value: ",ev.target.value)
        setMessage({[ev.target.id]: ev.target.value})
        console.log("message: ",message)
    
    }
    const PromoChange = (ev) => {
        
        let idd=ev.target.id
        console.log("idBMC: ",idd)
        console.log("iddMC: ", message.Sugared9Lemons)
        console.log("iddAMC: ", message[ev.target.id])
        console.log("value: ",ev.target.value)
        let val=ev.target.value
        setPromo(val)
        console.log("message: ",message)
    
    }
    
    
    const clickConfirm = (event) =>{
        let weightList=[]
        let namesList=[]
        for (let index = 0; index < list.length; index++) {
            weightList[index]=list[index][0]
            namesList[index]=list[index][1]
            
        }
        let sendToBack={
            Address: message.Address,
            Promo: promo,
            BoxType: allowedW,
            weightList: weightList,
            namesList: namesList
        }

        console.log("final: ",sendToBack)

        //send "sendToBack to backend"
        window.location.href = "success";
    }
    const clickRemove = (event) =>{
        let indRem= parseInt(event.target.id)
        let tempList=[]
        for (let index = 0; index < list.length; index++) {
            if (index==indRem){
                continue
            }
            else{
                tempList.push(list[index])

            }
            
        }
        setTw(tw-parseInt(list[indRem][0]))
        setList(tempList)
    }
    const toggle = () => {
      this.setState((prevState) => ({
        modal: !prevState.modal,
  
      }));
    };
    const crossHandler = () =>{
      setWeightE(0)
    }
    const renderElement=()=>{
      if(weightE == 1){
         return <Modal1
         className="Modal1"
         isOpen={Modal1}
         //toggle={this.toggle}
         align="centre"
         size = "big"
 >
 <div style={{ backgroundColor: "#D776D3" }}>
           <p className="titleD"> Weight Exceeded {`${allowedW}`} g! </p>
           <FontAwesomeIcon
             //onClick={this.toggle}
             onClick={crossHandler}
             //onClick={({Modal1}).modal('hide')}
             style={{
               position: "absolute",
               top: "0px",
               right: "0px",
               color: "black",
               margin: "20px",
             }}
             icon={faTimes}
             size="1.5x"
           />
         </div>
         <Form className="mt-3" noValidate inline >
           <div style={{ marginTop: "20px" }}>
             <div style={{ width: "200%", margin: "0 auto" }}>
               <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                 <p className="weightPopUp">Remove Something From The Cart To Proceed.</p>
               </FormGroup>
             </div>
           </div>
 
          
         </Form>
 </Modal1>;
      }
      else{
        return null;
      } 
      setWeightE(0)
      
   }

    return (

      

<div style={{backgroundColor: "#D776D3"}}>
<div className="addToCartText">ADD TO CART</div>
<div className="a320p"></div>
<div class="row" >
  <div class="col-sm-4">
    <div className="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={sl} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Sugared Lemons</h5>
                <p className="card-text">A perfect combination of candy sweetness, lemon acidity and soda fizz!</p>
        <form onSubmit={formSubmit} id="Sugared9Lemons">
                <input type='text' id="Sugared9Lemons" placeholder="Preferred weight? (g)" value={message.Sugared9Lemons} onChange={messageChange} />   
                <input type='submit'/>
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
                <h5 className="card-title">Apple Belts</h5>
                <p className="card-text">Sweet, chewy apples that give you a perfect organic aroma and soothing taste of nature!</p>
        <form onSubmit={formSubmit} id="Apple9Belts">
                <input type='text' id="Apple9Belts" placeholder="Preferred weight? (g)" value={message.Apple9Belts} onChange={messageChange} />   
                <input type='submit'/>
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
                <h5 className="card-title">Strawberry Belts</h5>
                <p className="card-text">Delicious long belts with a strawberry flavouring. We got you covered! </p>
            <form onSubmit={formSubmit} id="Strawberry9Belts">
                <input type='text' id="Strawberry9Belts" placeholder="Preferred weight? (g)" value={message.Strawberry9Belts} onChange={messageChange} />   
                <input type='submit'/>
            {
               
            }
            
        </form>

             </div>
        </div>
    </div>
  </div>
  <div className="a321p"></div>
  <div class="col-sm-4">
    <div class="card">
    <div className="card" style={mystyle}>
            <img className="card-img-top" src={cb} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Cola Belts</h5>
                <p className="card-text">A perfect answer to your cola craving. Say no more. We are here for you!</p>
        <form onSubmit={formSubmit} id="Cola9Belts">
                <input type='text' id="Cola9Belts" placeholder="Preferred weight? (g)" value={message.Cola9Belts} onChange={messageChange} />   
                <input type='submit'/>
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
            <img className="card-img-top" src={al} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Assorted Lollipops</h5>
                <p className="card-text">Who doesn't love delicious assorted lollipops with a plethora of flavors?</p>
            <form onSubmit={formSubmit} id="Assorted9Lollipops">
                <input type='text' id="Assorted9Lollipops" placeholder="Preferred weight? (g)" value={message.Assorted9Lollipops} onChange={messageChange} />   
                <input type='submit'/>
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
            <img className="card-img-top" src={tm} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Twist Mallows</h5>
                <p className="card-text"> Gluten free swirls that make for a perfect sweet treat. Enjoy! </p>
        <form onSubmit={formSubmit} id="Twist9Mallows">
                <input type='text' id="Twist9Mallows" placeholder="Preferred weight? (g)" value={message.Twist9Mallows} onChange={messageChange} />   
                <input type='submit'/>
            {
               
            }
            
        </form>

             </div>
        </div>
    </div>
  </div>

<div className="a321p"></div>
</div>
<div className="text_box"> {`Max weight allowed: ${allowedW} g`}</div>     
<div className="text_box"> {`Your total weight: ${tw} g`}</div>
<div className="cartText">SHOPPING CART</div>
<table class="table table-hover">
<tbody>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item</th>
      <th scope="col">Quantity (g)</th>
      <th scope="col">Remove?</th>
    </tr>
</tbody>
{list.map((e,i)=> {
                    return(
                        <tbody>
                            
                            {
                                <tr> <th scope="row" >{i+1}</th> <td>{e[1]}</td> <td>{e[0]}</td><td><button type="button" id={`${i}`} className="btn btn-secondary" onClick={clickRemove}>Remove</button></td></tr>
                            }
                            
                        </tbody>
                    )
                })}
</table>        
<div className="totalText">Total Payable Amount: {`${totalBill}`} PKR</div>
<div className="paymentMethodText">Add Address: *</div>
<form className="reg-form mt-3">
<FormGroup>
                            <Input
                                id="Address"
                                type="text"
                                width="10"
                                onChange={messageChange}
                                value={message.Address}
                            />
</FormGroup>
<div className="paymentMethodText">Add Promo Code:</div>
<FormGroup>
                            <Input
                                placeholder="Optional"
                                id="Promo"
                                type="text"
                                width="10"
                                onChange={PromoChange}
                                value={promo}
                            />
</FormGroup>
<div class="form-group">
  <div class="paymentMethodText">Select Payment Method:</div>
  <select class="form-control" id="sel1">
    <option>None</option>
    <option>Cash On Delivery</option>
  </select>
</div>
<div className="btn-handler">
                            <Button className="confirmOrder-btn" onClick={clickConfirm}>CONFIRM ORDER</Button>
                            
</div>
</form>
<div>
            {renderElement()}
</div>
  
</div>        
    

    )
}
class Menu320 extends Component {
    
    render(){
        
        return(
               
                <Hi2/>
        
    
        )
    }
    }

    export default Menu320;   


    