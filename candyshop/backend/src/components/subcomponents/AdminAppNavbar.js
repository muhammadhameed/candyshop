import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NavLinks(props) {
    return (
        <Nav className="mr-auto" navbar>
            <Link className="nav-link" to="/home/farms">Trips</Link>
            <span className="separator"></span>
            <Link className="nav-link" to="/home/alerts">Alerts</Link>
            <span className="separator"></span>
            <Link className="nav-link" to="/home/finances">Finance</Link>
        </Nav>
    );
}


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            link: props.link
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const check = (word) => (window.location.href.indexOf(word) > -1)
        return check("register") || check("login") || check("reset-password") || check("forgot-password") ? null : (
            <div >
                <Navbar className="navbar" expand="md">
                    <NavbarBrand className="title-small" href="/home">CANDY SHOP</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <div className="title-small-2">
                            <NavLinks link={window.location.href} />
                        </div>
                        <div className="search">
                            <Nav className="ml-auto">
                                <Form inline nav>
                                    <FormGroup>
                                        <Button className="nav-button"><FontAwesomeIcon icon={faSearch} size="lg" /></Button>
                                        <Input type="text" name="search" id="exampleSearch" placeholder="Search Trip" />
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
                                                <Link to="/add-user">
                                                <DropdownItem className="nav-but" onClick={() => {
                                                    localStorage.removeItem("token");
                                                    this.props.history.push('/adduser');
                                                }}>
                                                    Add User
                                                </DropdownItem>
                                                </Link>
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