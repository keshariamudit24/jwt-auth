require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const authRoute = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../schemas/userSchema')

const jwt_secret = process.env.JWT_SECRET

// -----> UNIQUE USERNAME <------ 

authRoute.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const founduser = await userModel.findOne({ username })
    console.log("user : ", founduser)
    if(!founduser){
        // hashes the plain text password with some "hashing algorithm and salting"   
        const hashPass = await bcrypt.hash(password, 5)
        console.log("plain text passowrd : ", password)
        console.log("hashed passowrd : ", hashPass)
        const newUser = new userModel({
            username,
            password: hashPass
        })
        await newUser.save()
        res.status(200).send({ msg: "successfully signed up" })
    } else {
        res.status(200).send({ msg: "user is already signed up, please proceed for sign in" })
    }
})

authRoute.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const founduser = await userModel.findOne({ username })
    if(founduser){

        const passwordMatch = await bcrypt.compare(password, founduser.password)

        if(passwordMatch){

            const token = jwt.sign({
                username: username
            }, jwt_secret)
            
            res.status(200).send({
                msg: "successfully signedin",
                token: token,
                username: username
            })

        } else {
            res.status(403).send({ msg: "incorrect credentials" })
        }
    }
    else{
        res.status(404).send({ msg: "you need to sign up first" })
    }
})

module.exports = authRoute