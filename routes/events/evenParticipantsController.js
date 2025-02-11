const supabase = require('../../supabase');

// Felhasználó csatlakozik egy eseményhez
const joinEvent = async (req, res) => {
    const { eventId, userId, status } = req.body;

    try {
        const { data: existingEntry, error: checkError } = await supabase
            .from('event_participants')
            .select('*')
            .eq('event_id', eventId)
            .eq('user_id', userId)
            .single();

        if (checkeError && checkError.code !== 'PGRST116') {
            throw checkError;
        }

        if (existingEntry) {
            return res.status(400).json({ error: 'User already joined this event' });
        }

        const { data, error } = await supabase
            .from('event_participants')
            .insert([{ event_id: eventId, user_id: userId, status: status || attending }]);

        if (error) throw error;

        res.status(201).json({ message: 'Successfully joined event', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Felhasználó módosítja a részvételi státuszát
const updateParticipantStatus = async (req, res) => {
    const { eventId, userId, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('event_participants')
            .update({ status })
            .eq('event_id', eventId)
            .eq('user_id', userId)
            .select();

        if (error) throw error;

        res.status(200).json({ message: 'Attendance updated successfully', data });
    } catch (err) {
        console.error('Error updating status:', err);
        res.status(500).json({ error: err.message });
    }
};

// Lekérdezi az eseményhez tartozó résztvevőket
const getEventParticipants = async (req, res) => {
    const { eventId } = req.params;

    try {
        const { data, error } = await supabase
            .from('event_participants')
            .select('user_id, status, users(name)')
            .eq('event_id', eventId)

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No participants found for this event' });
        }

        res.status(200).json({ participants: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { joinEvent, updateParticipantStatus, getEventParticipants };
