import {Button, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default function ScrollContainer() {
    
    function scrollR() {
        const r = document.querySelector(".scrolling_wrapper")
        r.scrollBy(250, 0)
    }
    function scrollL() {
        const r = document.querySelector(".scrolling_wrapper")
        r.scrollBy(-250, 0)
    }

    return (
        <div className="scroll_container bg-black">
            <Button className="scroll_nav_button left" onClick={scrollL}><FontAwesomeIcon icon={faAngleLeft}/></Button>
            {/*<div className="cover">*/}
                <div className="scrolling_wrapper">
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                    <Button variant="dark" className="scroll_item mx-2 py-1 rounded-3">Card</Button>
                </div>
            {/*</div>*/}
            <Button className="scroll_nav_button right" onClick={scrollR}><FontAwesomeIcon icon={faAngleRight}/></Button>
        </div>

    )
}