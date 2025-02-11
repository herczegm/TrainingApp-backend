const express = require('express');
const router = express.Router();
const {
    listEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('./eventsController');

// Események listázása
router.get('/', listEvents);

// Egy adott esemény lekérése
router.get('/:id', getEventById);

// Új esemény létrehozása
router.post('/', createEvent);

// Esemény frissítése
router.put('/:id', updateEvent);

// Esemény törlése
router.delete('/:id', deleteEvent);

module.exports = router;
