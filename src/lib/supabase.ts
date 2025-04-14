import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzjdulqgrywznitcfgnn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6amR1bHFncnl3em5pdGNmZ25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Nzk2NTcsImV4cCI6MjA2MDA1NTY1N30.ijOOWVKs8tykfBPpW92ttPJzm62MJ0OIeNeLq2qEeI8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});