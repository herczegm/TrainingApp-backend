const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Útvonalak importálása
const usersRoutes = require('./routes/users/usersRoutes');
const teamsRoutes = require('./routes/teams/teamsRoutes');
const eventsRoutes = require('./routes/events/eventsRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const eventParticipantsRoutes = require('./routes/events/eventParticipantsRoutes');

// JSON adatok kezelése
app.use(express.json());

app.use(cors());

//Auth API
app.use('/api/auth', authRoutes);

// Felhasználók API
app.use('/api/users', usersRoutes);

// Csapatok API
app.use('/api/teams', teamsRoutes);

//Események API
app.use('/api/events', eventsRoutes);

app.use('/api/event-participants', eventParticipantsRoutes)

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
