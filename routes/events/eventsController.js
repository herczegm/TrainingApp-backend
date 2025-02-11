const supabase = require('../../supabase');

// Események listázása
const listEvents = async (req, res) => {
    const { teamId } = req.query;
    try {
        const { data, error } = await supabase.from('events').select('*').eq('team_id', teamId);
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Egy adott esemény lekérése
const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Új esemény létrehozása
const createEvent = async (req, res) => {
    const { title, type, date, time, location, notes, team_id } = req.body;

    try {
        const { data, error } = await supabase
            .from('events')
            .insert([{ title, type, date, time, location, notes, team_id }])
            .select()
            .single();
        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Esemény frissítése
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, type, date, time, location, notes } = req.body;

    try {
        const { data, error } = await supabase
            .from('events')
            .update({ title, type, date, time, location, notes })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Esemény törlése
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) throw error;

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    listEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
