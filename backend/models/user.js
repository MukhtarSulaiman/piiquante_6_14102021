const mongoose = require('mongoose');
// It makes user's identifier unique in our database 
const uniqueValidator = require('mongoose-unique-validator');
// It creates a stric data type schema for our data
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
//  We use it here as a plugin to our data schema 
userSchema.plugin(uniqueValidator);
// Then we export it as model called Sauce
module.exports = mongoose.model('User', userSchema);