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

const joinTeam = async (req, res) => {
    const { userId, teamCode } = req.body;

    try {
        // Megkeressük a csapatot a csapatkód alapján
        const { data: team, error: teamError } = await supabase
            .from('teams')
            .select('id')
            .eq('code', teamCode)
            .single();

        if (teamError || !team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        // Frissítjük a felhasználó team_id mezőjét
        const { error: userError } = await supabase
            .from('users')
            .update({ team_id: team.id })
            .eq('id', userId);

        if (userError) throw userError;

        res.status(200).json({ message: 'Successfully joined the team', teamId: team.id });
    } catch (err) {
        console.error('Error joining team:', err);
        res.status(500).json({ error: err.message });
    }
};

const leaveTeam = async (req, res) => {
    const { userId } = req.body;

    try {
        console.log('Leaving team request received for user:', userId);
        // Frissítjük a felhasználó team_id mezőjét null-ra
        const { error } = await supabase
            .from('users')
            .update({ team_id: null })
            .eq('id', userId);

        if (error) {
            console.error('Supabase error:', error); // LOGOLÁS
            return res.status(500).json({ error: error.message });
            // throw error;
        }

        res.status(200).json({ message: 'Successfully left the team' });
    } catch (err) {
        console.error('Error leaving team:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    listTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    joinTeam,
    leaveTeam,
};
