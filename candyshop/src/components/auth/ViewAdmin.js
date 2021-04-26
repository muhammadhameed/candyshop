import React, { Component } from 'react';
import {
    Table,
    Input
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import api from "./api.js";
class ViewAdmin extends Component {
    state = {
        admins: [{
            _id: 10,
            name: "kdfmkdfm",
            firstName: "String",
            lastName: "String",
            email: "String - must be email",
            active: 0,
            permission: {
                manageAdmins: 1,
                manageInventory: 1,
                manageReqList: 1,
                manageReports: 1
            }
        }
        ],
        _id: 10,
        name: "",
        firstName: "",
        lastName: "",
        email: "",
    }

    display = () => {
        const addedAdmins = this.state.admins.map((i, index) =>

            <tbody>
                <tr>
                    <td className="title-sm-b-s">{i._id}</td>
                    <td className="title-sm-b-s"><Input type="text" value={i.email} onChange={(e) => {
                        const { admins } = this.state;
                        const newadmins = [...admins];
                        admins[index].email = e.target.value;
                        this.setState({ admins: newadmins })
                    }} /></td>
                    <td className="title-sm-b-s"><Input type="text" value={i.firstName} onChange={(e) => {
                        const { admins } = this.state;
                        const newadmins = [...admins];
                        admins[index].firstName = e.target.value;
                        this.setState({ admins: newadmins })
                    }} /></td>
                    <td className="title-sm-b-s"><Input type="text" value={i.lastName} onChange={(e) => {
                        const { admins } = this.state;
                        const newadmins = [...admins];
                        admins[index].lastName = e.target.value;
                        this.setState({ admins: newadmins })
                    }} /></td>
                    <td className="title-sm-b-s">{<Input type="checkbox" onChange={(e) => {
                        const { admins } = this.state;
                        const newadmins = [...admins];
                        admins[index].active = !admins[index].active;
                        this.setState({ admins: newadmins })
                    }
                    } checked={i.active} />}</td>
                    <td className="title-sm-b-s">{<Input type="checkbox"
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageAdmins = !admins[index].permission.manageAdmins;
                            this.setState({ admins: newadmins })
                        }//i.permission.manageAdmins
                        } checked={1} />}</td>
                    <td className="title-sm-b-s">{<div marginLeft><Input type="checkbox" 
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageInventory = !admins[index].permission.manageInventory;
                            this.setState({ admins: newadmins })
                        }//i.permission.manageInventory
                        } checked={1} /></div>}</td>
                    <td className="title-sm-b-s">{<Input type="checkbox"
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageReqList = !admins[index].permission.manageReqList;
                            this.setState({ admins: newadmins })
                        }//i.permission.manageReqList
                        } checked={1} />}</td>
                    <td className="title-sm-b-s">{<Input type="checkbox"
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageReports = !admins[index].permission.manageReports;
                            this.setState({ admins: newadmins })
                        }//i.permission.manageReports
                        } checked={1} />}</td>
                    <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={(e) => {
                        // console.log(
                        //     i._id,
                        //     i.firstName,
                        //     i.lastName,
                        //     !!i.active,
                        //     !!i.permission.manageAdmins,
                        //     !!i.permission.manageInventory,
                        //     !!i.permission.manageReqList,
                        //     !!i.permission.manageReports
                        // )

                        var totalinput = {name:i.name}
                        
                        fetch('http://localhost:4000/admin/approve',{
                            method: 'post',
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(totalinput)
                        }).then(function(response){
                            response.text().then(function(text){alert(text);});
                            // if (response.status != 400)
                            // {
                            //     window.location = "http://localhost:3001/home-server/";
                            // }
                        }).catch(function(error) {
                            console.error(error);
                        })
                        // api("account/admin/edit",
                        //     {
                        //         _id: i._id,
                        //         email: i.email,
                        //         firstName: i.firstName,
                        //         lastName: i.lastName,
                        //         active: !!i.active,
                        //         permission: {
                        //             manageAdmins: !!i.permission.manageAdmins,
                        //             manageInventory: !!i.permission.manageInventory,
                        //             manageReqList: !!i.permission.manageReqList,
                        //             manageReports: !!i.permission.manageReports
                        //         }
                        //     },
                        //     200).then(res => { })
                    }

                    } style={{ color: "#2E5984" }} icon={faSave} size="1x" /></button></td>

                </tr>
            </tbody>

        );
        return (
            <Table className="tablee" responsive >
                <thead>
                    <tr>
                        <th className="title-sm-b">Admin ID</th>
                        <th className="title-sm-b">Email</th>
                        <th className="title-sm-b">Name</th>
                        <th className="title-sm-b">Surname</th>
                        <th className="title-sm-b">Active</th>
                        <th className="title-sm-b">Admin</th>
                        <th className="title-sm-b">Inventory</th>
                        <th className="title-sm-b">ReqList</th>
                        <th className="title-sm-b">Reports</th>
                        <th className="title-sm-b">Save</th>
                    </tr>
                </thead>
                {addedAdmins}
            </Table>
        );
    }
    componentDidMount() {
        const orgObj = {
            _id: this.state._id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName

        };
        let copyObj = {};
        let keysToCopy = Object.keys(orgObj);
        for (let k of keysToCopy) {
            if (orgObj[k] !== "" && orgObj[k] !== 0) {
                copyObj[k] = orgObj[k];
            }
        }

        fetch('http://localhost:4000/admin/pending/',{
        method: 'get'
        }).then(function(response){
          return response.text();
        }).then(async function(text){
          console.log(JSON.parse(text))
          if (text == '[]')
          {
            alert('There are no pending admins to approve or deny.')
          }
          var data = JSON.parse(text)
          console.log(data[0])
          return data;
        }).then((res) => {this.setState({admins: res});
                this.render()
            })
    }
    render() {
        return (
            <div className="home-page_1">
                
                    <p className="brand-name">CANDY SHOP</p>
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <div className="title">View Admin</div>
                    {this.display()}
                </div>
            </div>
            </div>
            
            
        )
    }
}
export default ViewAdmin;