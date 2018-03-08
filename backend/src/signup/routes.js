const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log(req.baseUrl, Date.now())
    next()
})

// define the Component page route
router.get('/', function (req, res) {
    res.send("Singup homepage")
})


module.exports = router