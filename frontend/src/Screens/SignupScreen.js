import {
    Button,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel } from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Store} from "../Store/store";
import {useNavigate} from "react-router-dom";

export function SignupScreen() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { state, dispatch } = useContext(Store)

    const { userInfo } = state

    const signinHandler = async (e) => {
        e.preventDefault()

        try {
            const {data} = await axios.post('/api/signin', {
                name,
                email,
                password
            })

            dispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))

            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
        
    }

    useEffect(() => {

        if (userInfo) navigate('/')

    }, [userInfo])
    
    return (
        <Container className="text-white mt_long-100 auth_container bg-dark p-3 rounded-2">
            <Form className="m-auto">
                <div className="text-white text-center my-2 text-uppercase">Sign In</div>

                <FormGroup className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        className="bg-black border-0 text-white"
                        size="sm"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        className="bg-black border-0 text-white"
                        size="sm"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                {/*<Row>*/}
                    <Button
                        type="submit"
                        variant="secondary"
                        className="my-1 mx-auto w-100"
                        onClick={signinHandler}
                    >
                        Sign In
                    </Button>
                {/*</Row>*/}

            </Form>

            <hr />

            <Form className="m-auto">
                <div className="text-white text-center text-uppercase my-2">Sign Up</div>

                <FormGroup className="mb-3">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        className="bg-black border-0 text-white"
                        size="sm"
                        type="text"
                        placeholder="Name"
                    />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        className="bg-black border-0 text-white"
                        size="sm"
                        type="email"
                        placeholder="Email"
                    />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        className="bg-black border-0 text-white"
                        size="sm"
                        type="password"
                        placeholder="Password"
                    />
                </FormGroup>

                {/*<Row>*/}
                    <Button type="submit" variant="secondary" className="my-1 w-100">Sign Up</Button>
                {/*</Row>*/}

            </Form>

        </Container>
    )
    
}