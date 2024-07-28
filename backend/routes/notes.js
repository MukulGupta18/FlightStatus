const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const User = require('../models/User');  // Import User model
const { body, validationResult } = require('express-validator');
const sendEmail = require('../config/emailConfig');  // Adjust the path to emailConfig if necessary

// Route 1: Get All the Notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a New Note
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Update An Existing Note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        // Find user and send email notification
        const user = await User.findById(req.user.id);
        if (user) {
            // Send email and handle errors
            try {
                await sendEmail(user.email, 'Flight Details Update', "Dear - Your flight 6E 2342 is delayed. New departure time: 2024-07-26T17:00:00Z. Departure gate: C3, Arrival gate: 7A, Scheduled arrivale: 2024-07-26T17:17:00Z", );
                console.log('Email sent successfully');
            } catch (err) {
                console.error('Failed to send email:', err); 
            }
        }

        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete An Existing Note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
