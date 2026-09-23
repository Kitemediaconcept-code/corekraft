import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use a relative proxy URL to bypass ad blockers blocking .supabase.co domains
const clientUrl = typeof window !== 'undefined' 
  ? `${window.location.origin}/supabase-api` 
  : supabaseUrl;

export const supabase = createClient(clientUrl, supabaseAnonKey);
