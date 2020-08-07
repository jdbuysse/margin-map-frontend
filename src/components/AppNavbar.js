import React, {Component} from 'react';
import {
    Collapse, Nav, Navbar, 
    NavbarToggler, Container, 
    NavbarBrand, NavItem, NavLink
} from 'reactstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class AppNavbar extends Component {
    state = {
        isOpen: false,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return(
            <div>
            <Navbar color="light" light expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href='/'>Untitled Annotation App</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar />
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Route>
                                <NavLink href="/snip">Add Lesson</NavLink>
                                </Route>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Lessons</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Sign out</NavLink>
                            </NavItem>
                        </Nav>
                </Container>
            </Navbar>
            </div>
        )
    }
}