import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
var api = require('../auth/api');

function NavLinks(props) {
    return (
        <Nav className="mr-auto" navbar>
            <Link className="nav-link" to="/home/farms">Trips</Link>
            <span className="separator"></span>
            <Link className="nav-link" to="/home/alerts">Alerts</Link>
        </Nav>
    );
}


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            link: props.link,
            search: ""
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            password: this.state.password
        }
        api.apiCallerWithToken("http://localhost:8080/api/trip/fetch", userData, 200).then(res => {
            let path = `newPath`;
            this.props.history.push('/register');
        })

    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    render() {
        const check = (word) => (window.location.href.indexOf(word) > -1)
        return check("register") || check("login") || check("reset-password") || check("forgot-password") || check("change-password") ? null : (
            <div >
                <Navbar className="navbar" expand="md">
                    <NavbarBrand className="title-small" href="/home">CANDY SHOP</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <div className="title-small-2">
                            <NavLinks link={window.location.href} />
                        </div>
                        <div className="search">
                            <Nav className="ml-auto">
                                <Form inline nav onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Button className="nav-button"><FontAwesomeIcon icon={faSearch} size="lg" /></Button>
                                        <Input type="text" name="search" id="search" placeholder="Search Trip" value={this.state.search} onChange={this.onChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <UncontrolledDropdown >
                                            <DropdownToggle className="nav-button">
                                                <FontAwesomeIcon icon={faCog} size="lg" />
                                            </DropdownToggle>
                                            <DropdownMenu className="nav-but-big">
                                                <DropdownItem className="nav-but" onClick={() => {
                                                    localStorage.removeItem("token");
                                                    this.props.history.push('/change-password');
                                                }}>
                                                    Change Password
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem divider />
                                                <DropdownItem className="nav-but" onClick={() => {
                                                    localStorage.removeItem("token");
                                                    this.props.history.push('/login');
                                                }}>
                                                    Log Out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </FormGroup>
                                </Form>
                            </Nav>
                        </div>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default AppNavbar;