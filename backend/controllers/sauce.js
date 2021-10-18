const Sauce = require('../models/sauce');
const fs = require('fs'); // It's a native module that allows us to modify the file system

// Post request controller 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

// Put request controller 
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// Delete request controller 
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Get request controller for a specific id of an element
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// Get request controller for all elements 
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Post request controller for likes and dislikes
exports.likesAndDislikes = (req, res, next) => {
    let userId = req.body.userId;
    let like = req.body.like;
    let sauceId = req.params.id;
    if (like === 1) {
        Sauce.updateOne(
            { _id: sauceId },
            { $inc: { likes: +1 }, $push: { usersLiked: userId } }
        )
            .then(() => res.status(200).json({ message: 'Like aujouté !' }))
            .catch(error => res.status(400).json({ error }));
        
    } else if (like === -1) {
        Sauce.updateOne(
            { _id: sauceId },
            { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } }
        )
            .then(() => res.status(200).json({ message: 'Dislike aujouté !' }))
            .catch(error => res.status(400).json({ error }));
        
    } else if (like === 0) {
        Sauce.findOne({ _id: sauceId })
            .then(sauce => {
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne(
                        { _id: sauceId },
                        { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
                    )
                        .then(() => res.status(200).json({ message: 'Like retiré !' }))
                        .catch(error => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne(
                        { _id: sauceId },
                        { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
                    )
                        .then(() => res.status(200).json({ message: 'Dislike retiré !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
};