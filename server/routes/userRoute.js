require('dotenv').config()
const express = require('express')
const userRoute = express.Router()
const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET

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