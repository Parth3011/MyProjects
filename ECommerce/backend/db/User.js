const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/e-comm');

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model("users", userSchema);