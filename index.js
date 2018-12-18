const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const projectRoute = require('./data/routes/projectRoute')
const actionRoute = require('./data/routes/actionRoute')

const server = express();
const parser = express.json();
const PORT = 4000;

//Middleware
server.use(
  parser,
  helmet(),
  logger('dev'),
  cors()
)
//Routes 
server.use('/api/projects', projectRoute)
server.use('/api/actions', actionRoute)

//Listening
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});