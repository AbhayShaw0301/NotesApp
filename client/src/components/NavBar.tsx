import React from 'react';
import {User} from "../models/user";
import {Container, Nav, Navbar} from "react-bootstrap";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import {Link} from "react-router-dom";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginCLicked: () => void,
    onLogoutSuccessful: () => void,

}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginCLicked, onLogoutSuccessful}: NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    NotesApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                            : <NavBarLoggedOutView onSignUpClicked={onSignUpClicked} onLoginClicked={onLoginCLicked}/>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
};

export default NavBar;