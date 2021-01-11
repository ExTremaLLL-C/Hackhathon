const mongoose = require('mongoose');
const monogoLocal = require('passport-local-mongoose');

const Schema = new mongoose.Schema(
    {
        name:String,
        username:String,
        password:String,
    }
)

Schema.methods.validPassword = function( password ) {
    return ( this.password === password );
};
mongoose.plugin(monogoLocal);

module.exports= mongoose.model("Admin",Schema);