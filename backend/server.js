const express = require('express')
const app = express()
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Welcome to Crypto Mafia')
})

var signup = require("./src/signup/index")

app.use('/signup', signup.routes)

app.listen(4200, function () {
    console.log("Server running on 4202" )
})