import {Button, Nav, NavItem} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClockRotateLeft,
    faFilm,
    faHomeAlt,
    faSquareCaretRight
} from "@fortawesome/free-solid-svg-icons";
import {faCirclePlay, faUserCircle} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

export function SideBar() {
    return (
        <div className="d-flex side_navbar justify-content-between flex-wrap flex-column">
            <Nav className="flex-column text-white w-100 p-2">
                <NavItem className="py-2 ps-3 rounded-3 side_navbar_item">
                    {<FontAwesomeIcon icon={faHomeAlt} size={"lg"} className="pe-3"/>}Home
                </NavItem>
                <NavItem className="py-2 ps-3 rounded-3 side_navbar_item">
                    {<FontAwesomeIcon icon={faCirclePlay} size={"lg"} className="pe-3"/>} Shorts
                </NavItem>
                <NavItem className="py-2 ps-3 rounded-3 side_navbar_item">
                    {<FontAwesomeIcon icon={faFilm} size={"lg"} className="pe-3"/>} Subscriptions
                </NavItem>
                <hr className="hr_sidebar"/>
                <NavItem className="py-2 ps-3 rounded-3 side_navbar_item">
                    {<FontAwesomeIcon icon={faSquareCaretRight} size={"lg"} className="pe-3"/>} Library
                </NavItem>
                <NavItem className="py-2 ps-3 rounded-3 side_navbar_item">
                    {<FontAwesomeIcon icon={faClockRotateLeft} size={"lg"} className="pe-3"/>}History
                </NavItem>
                <hr className="hr_sidebar"/>
                <NavItem className="ms-4">
                    Sign in to like videos, comment, and subscribe.
                </NavItem>
                <NavItem className="ms-4 mt-3">
                    <Link to='/auth'><Button className="rounded-pill bg-black signin_button">
                            <FontAwesomeIcon icon={faUserCircle} size={"1x"} className="me-1"/> Sign in
                        </Button>
                    </Link>
                </NavItem>
            </Nav>
        </div>
    )
}