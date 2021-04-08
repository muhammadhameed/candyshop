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

Modal.setAppElement(document.getElementById('root'));
class CreateFarm extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    Name: "",
    Mobile: "",
    Promo: "",
    People: 0,
  };
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      
    }));
    this.props.errors.message = ""
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    const alertsPacket = this.state.alerts.map((alert) => {
      return {
        name: alert.description,
        duration: alert.duration,
        durationType: alert.selectedOption,
        linkedModel: "farm",
        startingDate: alert.AlertDate
      };
    });
    const data = {
      farm: {
        farmName: this.state.farmName,
        Location: this.state.Location,
        Description: this.state.Description,
        alerts: [],
      },
      alerts: alertsPacket,
    };
    // console.log(data);
    this.props.saveFarm(data);
  };
  render() {
    const { errors } = this.props;
    return (
      <Modal
      className="Modal"
        style={{ position: "relative", backgroundColor: "#2E5984"}}
        isOpen={this.state.modal}
        toggle={this.toggle}
      >
        <p
          style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "#4caf50",
          }}
        >
          Register For the Trip
        </p>
        <FontAwesomeIcon
          onClick={this.toggle}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            color: "#4caf50",
            margin: "5px",
          }}
          icon={faTimes}
          size="1x"
        />
        <Form className="mt-3 row" noValidate onSubmit={this.onSubmit} >
          <div className="">
            <div style={{ width: "90%", margin: "0 auto"}}>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="input-label-a">Mobile Number:</Label>
                <Input
                  className="input-field-a"
                  type="text"
                  id="Mobile"
                  placeholder="Enter Mobile Number"
                  onChange={this.onChange}
                  value={this.state.Mobile}
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="input-label-a">Promo Code:</Label>
                <Input
                  className="input-field-a"
                  type="text"
                  placeholder="Enter Promo Code"
                  onChange={this.onChange}
                  value={this.state.Promo}
                  id="Promo"
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="input-label-a">Number of People:</Label>
                <Input
                  className="input-field-a"
                  onChange={this.onChange}
                  value={this.state.People}
                  type="number"
                  id="People"
                  placeholder="0"
                  name="quantity" 
                  min="1" 
                  max="20"
                />
              </FormGroup>
            </div>
          </div>
          <div style={{ width: "25%", margin: "auto"}}>
            <Button className="submit-btn" type="submit" style={{borderColor: "black"}}>
              Register
            </Button>
            <Button
              type="reset"
              onClick={this.toggle}
              className="submit-btn"
              style={{borderColor: "black"}}
            >
              CANCEL
            </Button>
          </div>
          <p></p>
        </Form>
      </Modal>
    );
  }
}
export default CreateFarm

