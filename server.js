const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SERVER_PORT = 8080;
const api = require('./server/routes/api')
const errHandler = require('./server/errHandler')
const app = express();

mongoose.connect('mongodb://localhost/spacebookDB', ()=>{
console.log("DB connection established!!!");
})

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errHandler);
app.use('/',api);


app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});

