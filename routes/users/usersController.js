const supabase = require('../../supabase');

// Felhasználók listázása
const listUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Egy adott felhasználó lekérése
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

// Új felhasználó létrehozása
const createUser = async (req, res) => {
    const { email, name, teamId } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .insert([{ email, name, team_id: teamId }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Felhasználó frissítése
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, teamId } = req.body;
    try {
        const { data, error } = await supabase
            .from('users')
            .update({ email, name, team_id: teamId })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Felhasználó törlése
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase.from('users').delete().eq('id', id);
        if (error) throw error;

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email, team_id, roles')
            .eq('id', userId)
            .single();

        if (error) throw error;

        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: err.message });
    }
};

const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    try {
        const { data, error } = await supabase
            .from('users')
            .update({ name, email })
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({ message: 'Profile updated successfully', data });
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile,
};
