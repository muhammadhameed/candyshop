import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import api from "./api"

Modal.setAppElement(document.getElementById('root'));
class CreatePromoCode extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    box: "",
  };
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      code: "",
      maxDiscount: 0,
      discountPercentage: 0,

    }));
    this.props.history.push("/home/admin");
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const totalinput = {
      discountCode: this.state.code,
      discount: this.state.discountPercentage,
    }

    fetch('http://localhost:4000/discount/add',{
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
        className="Modall"
        isOpen={this.state.modal}
        toggle={this.toggle}
        align="centre"
      >
    <div style={{ backgroundColor: "#e0f143" }}>
          {/* <p>/</p> */}
          <p className="title_1"> Create Promo Code </p>
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
          <div style={{ marginLeft:"400px", marginTop:"100px" }}>
            <div style={{ width: "200%", margin: "0 auto" }}>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Code:</Label>
                <Input
                  type="text"
                  style={{ marginLeft: "80px" }}
                  id="code"
                  placeholder="Enter code"
                  onChange={this.onChange}
                  value={this.state.code}
                />
                <div style ={{marginLeft: "40px"}}>
                <Label className="title-sm-l">Maximum Discount:</Label></div>
                <Input
                  type="number"
                  style={{ marginLeft: "80px"}}
                  id="maxDiscount"
                  placeholder="Enter Maximum Discount Amount"
                  onChange={this.onChange}
                  value={this.state.maxDiscount}
                />
              </FormGroup>
              <FormGroup style={{ marginLeft:"160px", width: "100%", paddingBottom: "30px" }}>

                <Label className="title-sm" style={{ marginLeft: "20px",marginTop:"40px" }}>Discount Percentage:</Label>
                <Input
                  style={{ marginLeft: "55px",marginTop:"50px" }}
                  type="number"
                  placeholder="Enter Percentage"
                  onChange={this.onChange}
                  value={this.state.discountPercentage}
                  id="discountPercentage"
                />

              </FormGroup>
            </div>
          </div>
          <div className="btn-handler">
            <Button className="signup-btn" type="submit">Create</Button>
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Cancel</Button>
          </div>

          <p style={{ margin: "15px" }}>/</p>
        </Form>
      </Modal>
      </div>
    );
  }
}
export default CreatePromoCode

