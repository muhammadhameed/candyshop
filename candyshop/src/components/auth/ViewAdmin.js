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
            id: 10,
            email: "String - must be email",
            firstName: "String",
            lastName: "String",
            active: 0,
            permission: {
                manageAdmins: 1,
                manageTrips: 1,
                manageReqList: 1,
                manageReports: 1
            }
        },
        {
            id: 10,
            email: "String - must be email",
            firstName: "String",
            lastName: "String",
            active: 1,
            permission: {
                manageAdmins: 1,
                manageTrips: 1,
                manageReqList: 1,
                manageReports: 1
            }
        }
        ],
        id: this.props.location.state.id,
        email: this.props.location.state.email,
        firstName: this.props.location.state.firstName,
        lastName: this.props.location.state.lastName,
    }

    display = () => {
        const addedTrips = this.state.admins.map((i, index) =>

            <tbody>
                <tr>
                    <td className="title-sm-b-s">{i.id}</td>
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
                        }
                        } checked={i.permission.manageAdmins} />}</td>
                    <td className="title-sm-b-s">{<Input type="checkbox"
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageTrips = !admins[index].permission.manageTrips;
                            this.setState({ admins: newadmins })
                        }
                        } checked={i.permission.manageTrips} />}</td>
                    <td className="title-sm-b-s">{<Input type="checkbox"
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageReqList = !admins[index].permission.manageReqList;
                            this.setState({ admins: newadmins })
                        }
                        } checked={i.permission.manageReqList} />}</td>
                    <td className="title-sm-b-s">{<Input type="checkbox"
                        onChange={(e) => {
                            const { admins } = this.state;
                            const newadmins = [...admins];
                            admins[index].permission.manageReports = !admins[index].permission.manageReports;
                            this.setState({ admins: newadmins })
                        }
                        } checked={i.permission.manageReports} />}</td>
                    <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={(e) => {
                        console.log(
                            i.id,
                            i.firstName,
                            i.lastName,
                            !!i.active,
                            !!i.permission.manageAdmins,
                            !!i.permission.manageTrips,
                            !!i.permission.manageReqList,
                            !!i.permission.manageReports
                        )
                        api("account/admin/edit",
                            {
                                id: i.id,
                                email: i.email,
                                firstName: i.firstName,
                                lastName: i.lastName,
                                active: !!i.active,
                                permission: {
                                    manageAdmins: !!i.permission.manageAdmins,
                                    manageTrips: !!i.permission.manageTrips,
                                    manageReqList: !!i.permission.manageReqList,
                                    manageReports: !!i.permission.manageReports
                                }
                            },
                            200).then(res => { })
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
                        <th className="title-sm-b">Trip</th>
                        <th className="title-sm-b">ReqList</th>
                        <th className="title-sm-b">Reports</th>
                        <th className="title-sm-b">Save</th>
                    </tr>
                </thead>
                {addedTrips}
            </Table>
        );
    }
    componentDidMount() {
        const orgObj = {
            id: this.state.id,
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
        api("/admin/fetch", copyObj, 200).then(
            (e) => {
                console.log("res", e)
                {
                    this.setState({ admins: e.admins });
                    this.render()
                }
            });
    }
    render() {
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">View Admin</p>
                    {this.display()}
                </div>
            </div>
        )
    }
}
export default ViewAdmin;