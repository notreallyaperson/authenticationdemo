import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

const Register = props => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async e => {
        e.preventDefault()
        //Validation
        const newUser = {
            username,
            name,
            password
        }

        await axios.post('/api/auth/register', newUser)
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
        })
        .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={registerUser}>
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" placeholder="Type Username" onChange={e => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" placeholder="Type Name" onChange={e => setName(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="password placeholder" onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}

export default Register