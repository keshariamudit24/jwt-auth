const express = require('express')
const authRoute = require('./routes/authRoute')

const app = express()
app.use(express.json())

app.listen(3000)

app.use("/auth", authRoute)