const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');



const server = express();
const parser = express.json();
const PORT = 4000;

//Middleware
server.use(
  parser,
  helmet(),
  logger('dev'),
)
//Routes 

//Listening
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});