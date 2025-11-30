const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// GET all notes
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// POST create new note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ user: req.user.id, title, content });
  await newNote.save();
  res.json(newNote);
});

// PUT update note
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(updatedNote);
});

// DELETE note
router.delete('/:id', auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;
