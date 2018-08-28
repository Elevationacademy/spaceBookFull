const express = require('express')
const router = express.Router()

var request = require('request');


router.get('/simpleRoute', (req, res) => {
  res.send(JSON.stringify("Here I am. Rock you like a hurricane.")) //or whatever message you want
});


//post request handler
router.post('/secret', (req, res) => {
  //console.log(req.body);
  res.json(secretObj);
});

module.exports = router