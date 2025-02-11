const express = require('express');
const router = express.Router();
const {
    listUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
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

module.exports = router;
