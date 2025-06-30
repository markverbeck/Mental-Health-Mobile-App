import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../types/supabase';

// Load environment variables
import 'dotenv/config';

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'your_supabase_url';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your_supabase_anon_key';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database table names
export const TABLES = {
  USERS: 'users',
  USER_STATUS: 'user_status',
  FRIENDSHIPS: 'friendships',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  USER_SETTINGS: 'user_settings',
  PREMADE_MESSAGES: 'premade_messages',
  USER_METRICS: 'user_metrics',
  CRISIS_PROTOCOLS: 'crisis_protocols',
} as const;

// Real-time channels
export const CHANNELS = {
  STATUS_UPDATES: 'status_updates',
  FRIEND_REQUESTS: 'friend_requests',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
} as const;

// Helper function to get user ID
export const getCurrentUserId = async (): Promise<string | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
};

// Helper function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Error handling helper
export const handleSupabaseError = (error: any): string => {
  console.error('Supabase error:', error);
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.error_description) {
    return error.error_description;
  }
  
  return 'An unexpected error occurred. Please try again.';
}; 