const mongoose = require('mongoose');

const suaceSchema = mongoose.Schema({
    userId: { type: String, required},
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, requird: true},
    heat: { type: Number, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: [ String ],
    usersDislied: [ String ]
});

module.exports = mongoose.model('Sauce', suaceSchema);