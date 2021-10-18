const mongoose = require('mongoose');
// It creates a stric data type schema for our data
const suaceSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, requird: true},
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, requird: false },
    usersDisliked: { type: Array, requird: false }
});

module.exports = mongoose.model('Sauce', suaceSchema);