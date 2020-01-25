const mongoose = require('mongoose');

const LABELS = ['Learning Unit', 'Kata', 'Example', 'Lab', 'Done!', 'Review', 'Bonus'];

const cardSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        position: { type: Number, required: true },
        column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true },
        labels: [{ type: String, enum: LABELS }]
    },
    {
        timestamps: true, 
        toJSON: {
            transform: (doc, ref) => {{
                ref.id = doc._id;
                delete ref._id; 
                delete ref._v;
                return ref; 
            }}
        }
    }
);

const Card = new mongoose.model('Card', cardSchema);

module.exports = Card;