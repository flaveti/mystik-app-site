import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface WaitlistEntry {
  id?: string;
  email: string;
  created_at?: string;
}

export interface SpiritualGuide {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  specialty: string;
  experience: string;
  message?: string;
  created_at?: string;
}
