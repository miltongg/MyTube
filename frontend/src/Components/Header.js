import {Button, Dropdown, Nav, Navbar, NavItem, NavLink} from "react-bootstrap";
import SearchBox from "./SearchBox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEllipsisVertical, faNavicon, faVideoCamera} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {Store} from "../Store/store";
import DropdownMenu from "react-bootstrap/DropdownMenu";

export function Header() {

    const {state, dispatch} = useContext(Store)
    const {userInfo} = state

    const rightLinks = [
        {code: <FontAwesomeIcon className="right_nav_buttons" icon={faVideoCamera} />, path: '/create'},
        {code: <FontAwesomeIcon className="right_nav_buttons" icon={faBell}/>, path: '/notifications'},
        {code:
            <Dropdown>
                <Dropdown.Toggle aria-controls="navbar-dark-example" className="user_dropdown" id="dropdown-basic">
                    <img className="user_img rounded-circle" src="/images/default-user-proile.jpg" alt="user-img"/>
                </Dropdown.Toggle>
                <DropdownMenu variant="dark" className="direction text-white">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownMenu>
            </Dropdown>
            , path: '#'}
    ]
    
    const rightLinksNoSignin = [
        {code: <FontAwesomeIcon icon={faEllipsisVertical} className="text-light" />, path: '/options'},
        {code: <Button className="rounded-pill bg-black signin_button">
                    <FontAwesomeIcon icon={faUserCircle} size={"1x"} className="me-1"/> Sign in
                </Button>, path: '/auth'
        }
    ]
    
    return (
        <header className="fixed-top">
            <Navbar bg="black" variant="dark" expand="lg" className="justify-content-between">
                {/*<Container>*/}
                <Link to="/" className="ms-4 align-items-center text-decoration-none">
                    <Navbar.Brand className="fw-bold">
                        <FontAwesomeIcon icon={faNavicon} className="me-4 ms-1" />
                        <img className="logo me-1" src="/images/logos.png" alt="logo"/>
                        MyTube
                    </Navbar.Brand>
                </Link>
                <SearchBox />
                {userInfo ? <Nav className="pe-2 align-items-center d-flex flex-row">
                                {rightLinks.map(({code, path}) => (
                                    <Link key={path} to={path} className="mx-2 text-white">
                                        {code}
                                    </Link>
                                ))}
                            </Nav> :
                            <Nav className="pe-2 align-items-center d-flex flex-row">
                                {rightLinksNoSignin.map(({code, path}) => (
                                    <Link key={path} to={path} className="mx-2">
                                        {code}
                                    </Link>
                                ))}
                            </Nav>
                }
                {/*</Container>*/}
            </Navbar>
        </header>
    )
}