const express = require('express');
const router = express.Router();
const {
    listTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    joinTeam,
    leaveTeam,
} = require('./teamsController');

// Csapatok listázása
router.get('/', listTeams);

// Egy adott csapat részletei
router.get('/:id', getTeamById);

// Új csapat létrehozása
router.post('/', createTeam);

// Csapat adatainak frissítése
router.put('/:id', updateTeam);

// Csapat törlése
router.delete('/:id', deleteTeam);

// Csapathoz csatlakozás
router.post('/join', joinTeam);

// Csapatból kilépés
router.post('/leave', leaveTeam);

module.exports = router;
