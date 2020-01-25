const Column = require('../models/colums.models');
const Card = require('../models/cards.models');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
    Column.find()
        .populate('cards')
        .then(
            colums => res.json(colums)
        )
        .catch(next);
};

module.exports.get = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError(400, 'Invalid ID');
    }
    Column.findById(req.params.id)
        .populate('cards')
        .then(
            colums => {
                if(!card) {
                    throw createError(404, 'Card not found');
                }
                res.json(column);
            }
        )
        .catch(next)
};

module.exports.create = (req, res, next) => {
    const column = new Column(req.body); 
    column.save()
        .then(
            column => res.status(201).json(column)
        )
        .catch(next);
}

module.exports.update = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError(404, 'Invalid ID')
    }
    Column.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(
            column => {
                if(!column) {
                    throw createError(404, 'Column not found')
                } else {
                    res.json(column);
                }
            }
        )
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw createError(404, 'Invalid ID')
    }
    Promise
        .all([
            Column.findByIdAndDelete(req.params.id),
            Card.deleteMany({ column: req.params.id })
        ])
        .then(
            ([column, cards]) => {
                if(!column) {
                    throw createError(404, 'Column not found');
                } else {
                    res.status(204).json();
                }
            }
        )
        .catch(next);
};