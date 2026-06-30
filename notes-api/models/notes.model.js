import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: 200,
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    tags: {
        type: [String],
        default: [],
        lowercase: true,
    },
    isPinned: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

const Notes = mongoose.model('Notes', notesSchema);

export default Notes;