const mongoose = require('mongoose');

const mongoLocal = require('passport-local-mongoose');


const Schema = new mongoose.Schema(
    {
        Image:String,
        username:String,
        about:String
    }
);

mongoose.plugin(mongoLocal);

module.exports = mongoose.model("News",Schema);