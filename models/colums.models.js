const mongoose = require('mongoose');

const Card = require('./cards.models');

const columsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        position: { type: Number, required: true }
    },
    {
        timestamps: true, 
        toJSON: {
            virtuals: true, 
            transform: (doc, ref) => {
                ref.id = doc._id; 
                delete doc._id; 
                delete ref._id; 
                delete ref._v; 
                return ref; 
            }
        }
    }
);

columsSchema.virtual('cards', {
    ref: Card.modelName, 
    localField: '_id',
    foreignField: 'column',
    options: { sort: { position: -1 } }
});

const Column = new mongoose.model('Colums', columsSchema);

module.exports = Column; 