
// =========================================
// PATIL COLD - SUPABASE CONNECTION
// =========================================

const SUPABASE_URL = "https://kzleglqcablgrwfgocbd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Mveo1MEwV89kSzu07xqryg_yAI6VqQW";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
