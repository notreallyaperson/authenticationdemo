import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async e => {
        e.preventDefault()
        //Validation
        const newUser = {
            username,
            password
        }

        await axios.post('/api/auth/login', newUser)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
        })
        .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={loginUser}>
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" placeholder="Type Username" onChange={e => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="password placeholder" onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}

export default Login