const supabase = require('../../supabase');

// Regisztráció
const registerUser = async (req, res) => {
    const { email, password, name, teamId } = req.body;

    try {
        // Supabase auth használata
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        const user = authData?.user;
        if (!user) throw new Error('User registration failed');

        const { data: users, error: fetchError } = await supabase.from('users').select('id');

        if (fetchError) throw fetchError;

        const roles = users.length === 0 ? 'admin' : 'user';

        // Felhasználó adatok mentése az adatbázisban
        const { error: dbError } = await supabase
            .from('users')
            .insert([{ auth_id: user.id, email, name, team_id: teamId || null, roles: roles }]);

        if (dbError) throw dbError;

        res.status(201).json({ message: 'Registration successful', user: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Bejelentkezés
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Supabase auth használata
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) throw authError;

        // Felhasználó adatainak lekérdezése
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', authData.user.id)
            .single();

        if (userError) throw userError;

        res.status(200).json({ message: 'Login successful', user: userData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerUser, loginUser };
