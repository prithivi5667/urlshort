require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path')

console.log('Current folder: ' + __dirname);
const  app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
  if(err){
    console.log('Error connecting to: '+ dbURL)
  }
  else{
    console.log('Connected to: '+ dbURL);
  }
});

routes(app);
app.use(express.static(path.join(__dirname, "/react/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/react/build', 'index.html'));
});

const port = process.env.PORT;
const server = app.listen(process.env.PORT ||5000 , () =>
  console.log(`Your server is running on port ${port}`)
);

module.exports = { server };