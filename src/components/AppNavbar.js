import React, {Component} from 'react';
import {
    Collapse, Nav, Navbar, 
    NavbarToggler, Container, 
    NavbarBrand, NavItem, NavLink
} from 'reactstrap';


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
                                <NavLink href="https://github.com/jdbuysse">Github</NavLink>
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