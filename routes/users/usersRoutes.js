const express = require('express');
const router = express.Router();
const {
    listUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
} = require('./usersController');

// Felhasználók listázása
router.get('/', listUsers);

//Egy adott felhasználó lekérése
router.get('/:id', getUserById);

// Új felhasználó létrehozása
router.post('/', createUser);

//Felhasználó frissítése
router.put('/:id', updateUser);

//Felhasználó törlése
router.delete('/:id', deleteUser);

// Felhasználói profil lekérdezése
router.get('/profile/:userId', getUserProfile);

// Felhasználói profil módosítása
router.put('/profile/:userId', updateUserProfile);

module.exports = router;
