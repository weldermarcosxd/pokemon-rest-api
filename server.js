//dependencies
const express = require('express');

//init express
const app = express();

//define port
const port = process.env.PORT || 3000;

//define router
const router = express.Router();

//initial route
router.get('/', function(req, res){
  res.json({message: 'This is the primal route'});
});

//register all your routes with api
app.use('/api', router);

//start server
app.listen(port);
console.log('api is running in ' + port);
