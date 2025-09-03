import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/notes.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth); // Protect all routes

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;
