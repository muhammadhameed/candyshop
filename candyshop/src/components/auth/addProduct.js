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
    description: "",
    image : [],
    price: 0,

    manufacturedate: Date(),
    expirydate:  Date(),
    
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
    const userData = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      
    }

    api("api/trip/create", userData, 200).then(res => {
      if (res.statusCode === 200) {
        this.props.history.push("/home/admin");
        console.log(res)
      }
      else {
        alert("Error")
      }
    }
    )
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
        <div style={{ backgroundColor: "#FF69B4" }}>
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
                <Label className="title-sm">Name:</Label>
                <Input
                  type="text"
                  style={{ marginLeft: "115px" }}
                  id="name"
                  placeholder="Enter Product Name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <Label className="title-sm"style = {{marginLeft: "20px"}}>Image:</Label>
                <input type="file"
                  style={{ marginLeft: "15px" }}
                  id="image"
                  placeholder="Enter Product image"
                  onChange={this.onChange}
                  value={this.state.image}
                />
            
              </FormGroup>
              <FormGroup style={{ width: "50%", paddingBottom: "30px" }}>
                <Label className="title-sm">Description:</Label>
                <Input
                  type="textarea"
                  style={{ marginLeft: "55px", width: "60%" }}
                  id="description"
                  placeholder="Enter Description"
                  onChange={this.onChange}
                  value={this.state.description}
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
                  value={this.state.capacity}
                />

                <Label className="title-sm-l" style = {{marginLeft: "20px"}}>Price: </Label>
                <Input
                  style={{ marginLeft: "15px" }}
                  type="number"
                  placeholder="Enter Price"
                  onChange={this.onChange}
                  value={this.state.number}
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
                  value={this.state.Date}
                  id="manufacturedate"
                />
                <Label className="title-sm-l" style={{ marginLeft: "20px" }}> Expiry Date: </Label>
                <Input
                  style={{ marginLeft: "20px" }}
                  type="Date"
                  placeholder="Enter Expiry Date"
                  onChange={this.onChange}
                  value={this.state.endDate}
                  id="expirydate"
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

