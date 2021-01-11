const mongoose = require('mongoose');
const mongoLocal = require('passport-local-mongoose');

const Schema = new mongoose.Schema(
    {
        Image:String,
        Mail:String,
        About:String,
        username:String
    }
)

mongoose.plugin(mongoLocal);

module.exports = mongoose.model("Clinic", Schema);