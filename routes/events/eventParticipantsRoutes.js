const express = require('express');
const router = express.Router();
const { joinEvent, updateParticipantStatus, getEventParticipants } = require('./evenParticipantsController');

// Felhasználó csatlakozik egy eseményhez
router.post('/join', joinEvent);

// Felhasználó módosítja a részvételi státuszát
router.put('/update-status', updateParticipantStatus);

// Lekérdezi az eseményhez tartozó résztvevőket
router.get('/:eventId/participants', getEventParticipants);

module.exports = router;
