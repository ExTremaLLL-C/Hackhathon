const mongoos = require('mongoose');
const mongoLocar = require('passport-local-mongoose');

const Schema = new mongoos.Schema({
    Image:String,
    Mail:String,
    About:String,
    username:String
})

mongoos.plugin(mongoLocar);

module.exports = mongoos.model("Doctors",Schema);