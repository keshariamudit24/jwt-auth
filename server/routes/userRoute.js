require('dotenv').config()
const express = require('express')
const userRoute = express.Router()
const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET

function auth(req, res, next){
    const { token } = req.body
    const decodedData = jwt.verify(token, jwt_secret)
    if(decodedData){
        next()
    }
    else {
        res.json({ msg: "you're not logged in" })
    }
}

userRoute.post('/me', async (req, res) => {
    const { token } = req.body
    const decodedInfo = jwt.verify( token, jwt_secret) // { username: "mudit" }
    const username = decodedInfo.username
    const user = await userModel.findOne({ username })
    res.json({
        username,
        password: user.password
    })
})

module.exports = userRoute