
// =========================================
// PATIL COLD - SUPABASE CONNECTION
// =========================================

const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";

const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
