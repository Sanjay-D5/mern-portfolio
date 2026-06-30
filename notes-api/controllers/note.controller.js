import mongoose from "mongoose";
import Notes from "../models/notes.model.js";

export const getNotes = async (req, res, next) => {
    try {
        const {tag, search} = req.query;
        const filter = {};

        if(tag) filter.tags = tag.toLowerCase();
        // $regex - Find titles containing "meet".
        // $options: 'i' - Case-insensitive(matches all)
        if(search) filter.title = { $regex: search, $options: 'i'};

        // -1 means descending order, so the newest notes (highest createdAt) come first.
        const notes = await Notes.find(filter).sort({craeteAt: -1});

        res.status(200).json({success: true, data: notes});
    } catch (error) {
        next(error);
    }
};

export const getNote = async (req, res, next) => {
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error("Invalid note ID");
            error.statusCode = 400;
            throw error;
        }

        const note = await Notes.findById(id);

        if(!note){
            const error = new Error("Note not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: note});
    } catch (error) {
        next(error);      
    }
};

export const createNote = async (req, res, next) => {
    try {
        const note = await Notes.create(req.body);

        res.status(201).json({success: true, data: note})
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("Invalid note ID");
            error.statusCode = 400;
            throw error;
        }

        const note = await Notes.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,           // return the UPDATED document, not the stale pre-update one
                runValidators: true, // re-run schema validation (required, maxLength, etc.) on update
            }
        );

        if (!note) {
            const error = new Error("Note not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: note})
    } catch (error) {
        next(error);
    }
};

export const deleteNote = async (req, res, next) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("Invalid note ID");
            error.statusCode = 400;
            throw error;
        }

        const note = await Notes.findByIdAndDelete(id);

        if (!note) {
            const error = new Error("Note not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, message: "Note deleted"});
    } catch (error) {
        next(error);
    }
};

export const getByTags = async (req, res, next) => {
  try {
        // Returns ALL unique tags across notes when no ?tag= is given,
        // or filters to notes matching a specific tag when provided.
        const {tag} = req.query;

        if(tag) {
            const notes = await Notes.find({tags: tag.toLowerCase()});
            return res.status(200).json({success: true, data: notes});
        }

        const uniqueTags = await Notes.distinct('tags');

        res.status(200).json({ success: true, data: uniqueTags });
    } catch (error) {
        next(error);
    }
};
