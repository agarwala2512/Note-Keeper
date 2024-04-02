import express, { Request, Response } from 'express';
import Note from '../models/Notes';

const router = express.Router();

// get all the notes
router.get('/', async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// get a single note by ID 
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// create a note in the db
router.post('/', async (req: Request, res: Response) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

// update a note by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (req.body.title)
            note.title = req.body.title;
        if (req.body.content)
            note.content = req.body.content;
        const updateNote = await note.save();
        res.json(updateNote);

    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// delete a note by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        await note.deleteOne();
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;