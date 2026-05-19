import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = URL && API_KEY ? createClient(URL, API_KEY) : null;
export const isSupabaseConfigured = Boolean(supabase);
