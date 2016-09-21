//dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/config');
const Pokemon = require('./entity/models/pokemons');

//init express
var app = express();

//inject bodyParser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

//connect mongoose to database
mongoose.connect(config.database);

//define port
const port = config.port || 3000;

//define router
const router = express.Router();

//initial route
router.get('/', function(req, res) {
    res.json({
        message: 'This is the primal route'
    });
});

// route for the pokemon entity
const pokemonsRoute = router.route('/pokemons');

//endpoint which will manage post requests to /pokemons
//curl -X POST -d "name=pokemonMaster&attack=1232&defense=3000" http://localhost:2345/api/pokemons?format=xml
pokemonsRoute.post(function(req, res){

    //create a new object of type pokemon defined in models
    var pokemon = new Pokemon();

    //set the properties to the object
    pokemon.name = req.body.name;
    pokemon.attack = req.body.attack;
    pokemon.defense = req.body.defense;

    //save the object
    pokemon.save(function(err, data){
        if(err){
          res.send(err)
        }

        res.json({message: 'Pokemons saved successfully: ', data: pokemon});
    })
});

//endpoint that will return all the Pokemons
pokemonsRoute.get(function(req, res){
    //use Pokemon model to find all the pokemons
    Pokemon.find({},{img: 0},function(err, pokemons){
      if(err){
        res.send(err);
      }

      res.json(pokemons);
    });
});

//route that jandle single pokemons
const pokemonRoute = router.route('/pokemons/:id');

//get resquest for single pokemon
pokemonRoute.get(function(req, res){

    //find by id that brings the pokemons data without the img field
    Pokemon.findById(req.params.id, {img: 0}, function(err, pokemon){
        if(err){
            res.send(err);
        }

        res.json(pokemon);
    });
});

//update the value for single pokemon
pokemonRoute.put(function(req, res){

    //find the specific pokemon to update
    Pokemon.findById(req.params.id, {img: 0}, function(err, pokemon){

      if(err){
          res.send(err);
      }

      //update the value for the field attack
      pokemon.attack = req.body.attack;

      //save the updated pokemon
      pokemon.save(function(err){
          if(err){
              res.send(err);
          }

          res.json(pokemon);
      });
    });
});

//route thats deletes the pokemon
pokemonRoute.delete(function(req, res){

    var id = req.params.id;

    //function thats find the pokemon and deletes it
    Pokemon.findByIdAndRemove(req.params.id, function(err){

        if(err){
            res.send(err);
        }

        res.json({message: 'Pokemons successfully removed:', id})

    })

})

//register all your routes with api
app.use('/api', router);

//start server
app.listen(port);
console.log('api is running in ' + config.port);
