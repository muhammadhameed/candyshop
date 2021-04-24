import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import api from "./api"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));
class addProduct extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    name: "",
    collectionName: "",
    quantity: 0,
    image : [],
    price: 0,

    startDate: Date(),
    endDate:  Date(),
    
  };
  componentDidMount() {
    api("location/fetch", {}, 200).then(
      (e) => {
        if (e.locations !== undefined)
          this.setState({ data: e.locations });
      });
  }
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,

    }));
    this.props.history.push("/home/admin")
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  display = () => {
    const addedLocations = this.state.data.map((d, index) =>
      <option value={d.id} onChange={this.setState[{ locationIDs: [d.id] }]}>{d.site}</option>
    );
    return (
      <select name="locationIDs" id="locationIDs" className="select">
        {addedLocations}
      </select>
    );
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    
    var productName = this.state.name;
    var collectionName = this.state.collectionName;
    var price = this.state.price;
    var quantity= this.state.quantity;
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;
    var totalinput = {collectionName, productName, quantity, price};
    console.log(totalinput);
    
    fetch('http://localhost:5000/product/add/',{
        method: 'post',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(totalinput)
    }).then(function(response){
        response.text().then(function(text){alert(text);});
        if (response.status != 400)
        {
            window.location = "http://localhost:3000/home-server/";
        }
    }).catch(function(error) {
        console.error(error);
    })
  };

  render() {

    return (

<div className ="home-page_1">
      <Modal
        className="Modal"
        isOpen={this.state.modal}
        toggle={this.toggle}
        align="centre"
        size = "big"
        
      >
        <div style={{ backgroundColor: "#e0f143" }}>
          {/* <p>/</p> */}
          <p className="title"> Add Product </p>
          {/* <p>/</p> */}
          <FontAwesomeIcon
            onClick={this.toggle}
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              color: "#FF69B4",
              margin: "20px",
            }}
            icon={faTimes}
            size="1.5x"
          />
        </div>
        <Form className="mt-3" noValidate inline onSubmit={this.onSubmit} >
          <div style={{ marginTop: "20px" }}>
            <div style={{ width: "200%", margin: "0 auto" }}>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Category:</Label>
                <Input
                  type="text"
                  style={{ marginLeft: "70px" }}
                  id="collectionName"
                  placeholder="Enter Category"
                  onChange={this.onChange}
                  value={this.state.collectionName}
                />
                <Label className="title-sm"style = {{marginLeft: "20px", fontcolor :"#FF69B4"}}>Image:</Label>
                <input type="file"
                  style={{ marginLeft: "15px" }}
                  id="image"
                  placeholder="Enter Product image"
                  onChange={this.onChange}
                  value={this.state.image}
                />
            
              </FormGroup>
              <FormGroup style={{ width: "50%", paddingBottom: "30px" }}>
                <Label className="title-sm">Name:</Label>
                <Input
                  type="textarea"
                  style={{ marginLeft: "90px", width: "60%" }}
                  id="name"
                  placeholder="Enter Product Name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </FormGroup>
              <FormGroup style={{ width: "200%", paddingBottom: "30px" }}>
                <Label className="title-sm">Quantity:</Label>
                <Input
                  type="number"
                  style={{ marginLeft: "75px" }}
                  id="quantity"
                  placeholder="Enter Quantity"
                  onChange={this.onChange}
                  value={this.state.quantity}
                />

                <Label className="title-sm-l" style = {{marginLeft: "20px"}}>Price: </Label>
                <Input
                  style={{ marginLeft: "40px" }}
                  type="number"
                  placeholder="Enter Price"
                  onChange={this.onChange}
                  value={this.state.price}
                  id="price"
                />
              </FormGroup>
              <FormGroup style={{ width: "200%", paddingBottom: "70px" }}>
                <Label className="title-sm">Manufacture Date: </Label>
                <Input
                  style={{ marginLeft: "10px" }}
                  type="Date"
                  placeholder="Manufacture Date"
                  onChange={this.onChange}
                  value={this.state.startDate}
                  id="startDate"
                />
                <Label className="title-sm-l" style={{ marginLeft: "20px" }}> Expiry Date: </Label>
                <Input
                  style={{ marginLeft: "20px" }}
                  type="Date"
                  placeholder="Enter Expiry Date"
                  onChange={this.onChange}
                  value={this.state.endDate}
                  id="endDate"
                />
              </FormGroup>

            </div>
          </div>

          <div className="btn-handler">
            <Button className="signup-btn" type="submit">Add Product</Button>
            {/* <Button className="signup-btn" type="reset" onClick={() => window.location.href = "/add-product/admin"}>Create Location</Button> */}
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Cancel</Button>
          </div>

          <p style={{ marginBottom: "1px" }}>.</p>
        </Form>
      </Modal>
      </div>
    );
  }
}
export default addProduct

