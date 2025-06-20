require('dotenv').config()
const express = require('express')
const authRoute = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../schemas/userSchema')

const jwt_secret = process.env.JWT_SECRET

authRoute.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const founduser = await userModel.findOne({ username })
    console.log("user : ", founduser)
    if(!founduser){
        const newUser = new userModel({
            username,
            password
        })
        await newUser.save()
        res.status(200).send({ msg: "successfully signed up" })
    } else {
        res.status(200).send({ msg: "user is already signed up, please proceed for sign in" })
    }
})

authRoute.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const founduser = await userModel.findOne({ username, password })
    if(founduser){
        const token = jwt.sign({
            username: username
        }, jwt_secret)
        res.status(200).send({
            msg: "successfully signedin",
            token: token,
            username: username
        })
    }
    else{
        res.status(404).send({ msg: "you need to sign up first" })
    }
})

module.exports = authRoute