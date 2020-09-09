const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/User')
const auth = require('../middleware/auth')

// Registration API
// public access

router.route('/register').post((req,res) => {
    const {username, password, name} = req.body
    // Backend validation

    userModel.findOne({
        username
    }).then(user => {
        if(user) return res.status(400).json({message: 'username exists'})
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password , salt, (err,hash) => {
                if (err) throw err
                const newUser = new userModel({
                    username,
                    password: hash,
                    name,
                })
                newUser.save()
                .then(user => {
                    jwt.sign(
                        {
                            username: user.username,
                            name: user.name
                        },
                        "demosecret",
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                user: {
                                    username: user.username,
                                    name: user.name
                                }
                            })
                        }
                    )
                })
                .catch(err => console.log(err))
            })
        })
        

    })
    .catch(err => console.log(err))
})

router.route('/login').post((req,res) => {
    const {username, password} = req.body
    // Backend validation

    userModel.findOne({
        username
    }).then(user => {
        if(!user) return res.status(400).json({message: 'username does not exists'})
        bcrypt.compare(password, user.password, (err, same) => {
            if (err) throw err
            if(same){
                jwt.sign(
                    {
                        username: user.username,
                        name: user.name
                    },
                    "demosecret",
                    {expiresIn: 3600},
                    (err, token) => {
                        if (err) throw err
                        res.json({
                            token,
                            user: {
                                username: user.username,
                                name: user.name
                            }
                        })
                    }
                )
            }
        })

    })
    .catch(err => console.log(err))
})



router.get("/", auth, (req, res) => {
    const {username, exp} = req.user
    //Triggered upon any load of page. Will extend token if expiring
    userModel.findOne({username})
    .then(user => {
        if((new Date(exp*1000)-new Date())/60000<60){
            jwt.sign(
                {
                    username: user.username,
                    name: user.name
                },
                "demosecret",
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err
                    res.json({
                        token,
                        user: {
                            username: user.username,
                            name: user.name
                        }
                    })
                }
            )
        } else {
            res.json({
                user: {
                    username: user.username,
                    name: user.name
                }
            })
        }
    })
})

module.exports = router