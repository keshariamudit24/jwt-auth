require('dotenv').config()
const express = require('express')
const userModel = require('../schemas/userSchema')
const userRoute = express.Router()
const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET

function auth(req, res, next){
    const  token  = req.headers.token
    const decodedData = jwt.verify(token, jwt_secret)
    if(decodedData){
        req.username= decodedData.username
        next()
    }
    else {
        res.json({ msg: "you're not logged in" })
    }
}

// using auth middleware 
userRoute.get('/me', auth, async (req, res) => {
    // const token  = req.headers.token
    // const decodedInfo = jwt.verify( token, jwt_secret) // { username: "mudit" }
    const username = req.username 
    const user = await userModel.findOne({ username })
    res.json({
        username,
        password: user.password
    })
})

module.exports = userRoute