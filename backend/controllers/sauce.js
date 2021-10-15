const Sauce = require('../models/sauce');



exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    
};

exports.deleteSauce = (req, res, next) => {
    
};

exports.getOneSauce = (req, res, next) => {
    
};

exports.getAllSauces = (req, res, next) => {
    
};