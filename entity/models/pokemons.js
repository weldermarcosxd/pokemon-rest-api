//dependencies
const mongoose = require('mongoose');

//mongoose schema
const PokemonSchema = new mongoose.Schema({
    name: String,
    attack: Number,
    defense: Number,
    height: Number,
    hp: Number,
    speed: Number,
    created_at: String,
    types: [String],
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
