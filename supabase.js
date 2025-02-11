const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hhnosbvpjqihuglvtzxd.supabase.co'; // Cseréld le a saját URL-re
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhobm9zYnZwanFpaHVnbHZ0enhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzI0MzMsImV4cCI6MjA1MjQ0ODQzM30.B38zNH096D0_LySTk7TikrEvqnnPsUozH7igEYVpJ-Y'; // Cseréld le a saját Anon Key-re

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase;