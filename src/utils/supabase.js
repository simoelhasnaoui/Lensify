import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing credentials! Authentication and cloud storage will be disabled.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
