import {Button, Form, FormControl, InputGroup, Row} from "react-bootstrap";

export default function SearchBox() {
    return(
        <Form className="search-box d-flex">
            <InputGroup>
                <FormControl
                    className="input_search bg-black"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                >

                </FormControl>
                <Button variant="dark" className="button_search">
                    <i className="fas fa-search search-icon-color"></i>
                </Button>
            </InputGroup>
            <Button variant="dark" className="rounded-circle voice_search_button ms-2">
                <i className="fas fa-microphone" aria-hidden="true"></i>
            </Button>
        </Form>
    )
}