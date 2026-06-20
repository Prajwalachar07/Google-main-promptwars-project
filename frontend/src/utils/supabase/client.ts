import { createClient } from '@supabase/supabase-js';

// Read variables from Vite env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mbgioelfmmlzhftuwuvv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_5fBlzxApBaG-HGIvuAouCA_StBccb8R';

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
