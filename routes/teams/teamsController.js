const supabase = require('../../supabase');

// Csapatok listázása
const listTeams = async (req, res) => {
    try {
        const { data, error } = await supabase.from('teams').select('*');
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Egy adott csapat részletei
const getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase.from('teams').select('*').eq('id', id).single();
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Új csapat létrehozása
const createTeam = async (req, res) => {
    const { name, code, createdBy } = req.body;

    try {
        const { data, error } = await supabase
            .from('teams')
            .insert([{ name, code, created_by: createdBy }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Csapat adatainak frissítése
const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, code } = req.body;

    try {
        const { data, error } = await supabase
            .from('teams')
            .update({ name, code })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Csapat törlése
const deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase.from('teams').delete().eq('id', id);
        if (error) throw error;

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    listTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
};
