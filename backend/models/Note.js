const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
    email: {
        type: String,
        required: true

    },

    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "General"

    },
    date: {
        type: Date,
        default: Date.now

    },

});

const Notes = mongoose.model('Note', NotesSchema);
module.exports = Notes;