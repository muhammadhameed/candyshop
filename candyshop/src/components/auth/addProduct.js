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
    itienrary: "",
    price: 0,
    capacity: 0,
    startDate: new Date(),
    endDate: new Date(),
    data: [],
    locationIDs: []
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
      itienrary: this.state.itienrary,
      price: this.state.price,
      capacity: this.state.capacity,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      locationIDs: this.state.locationIDs
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


      <Modal
        className="Modal"
        isOpen={this.state.modal}
        toggle={this.toggle}
        align="centre"
      >
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <p>/</p>
          <p className="title-med"> Create Trip </p>
          <p>/</p>
          <FontAwesomeIcon
            onClick={this.toggle}
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              color: "#2E5984",
              margin: "20px",
            }}
            icon={faTimes}
            size="1.5x"
          />
        </div>
        <Form className="mt-3" noValidate inline onSubmit={this.onSubmit} >
          <div style={{ marginTop: "20px" }}>
            <div style={{ width: "90%", margin: "0 auto" }}>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Name:</Label>
                <Input
                  type="text"
                  style={{ marginLeft: "115px" }}
                  id="name"
                  placeholder="Enter Trip Name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <Label className="title-sm-l">Location: </Label>
                {this.display()}
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
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
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Capacity:</Label>
                <Input
                  type="number"
                  style={{ marginLeft: "85px" }}
                  id="capacity"
                  placeholder="Enter Capacity"
                  onChange={this.onChange}
                  value={this.state.capacity}
                />

                <Label className="title-sm-l">Price: </Label>
                <Input
                  style={{ marginLeft: "45px" }}
                  type="number"
                  placeholder="Enter Price"
                  onChange={this.onChange}
                  value={this.state.number}
                  id="price"
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Start Date: </Label>
                <Input
                  style={{ marginLeft: "70px" }}
                  type="Date"
                  placeholder="Enter Start Date"
                  onChange={this.onChange}
                  value={this.state.startDate}
                  id="startDate"
                />
                <Label className="title-sm-l" style={{ marginLeft: "50px" }}> EndDate: </Label>
                <Input
                  style={{ marginLeft: "20px" }}
                  type="Date"
                  placeholder="Enter Endt Date"
                  onChange={this.onChange}
                  value={this.state.endDate}
                  id="endDate"
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Itinerary:</Label>
                <Input
                  style={{ marginLeft: "85px", width: "60%" }}
                  type="textarea"
                  placeholder="Enter Itinerary"
                  onChange={this.onChange}
                  value={this.state.itienrary}
                  id="itienrary"
                />

              </FormGroup>

            </div>
          </div>
          <div className="btn-handler">
            <Button className="signup-btn" type="submit">Create Trip</Button>
            <Button className="signup-btn" type="reset" onClick={() => window.location.href = "/create-location/admin"}>Create Location</Button>
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Cancel</Button>
          </div>

          <p style={{ marginBottom: "1px" }}>.</p>
        </Form>
      </Modal>
    );
  }
}
export default addProduct

