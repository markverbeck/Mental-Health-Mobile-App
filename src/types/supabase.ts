// Supabase Database Types
// This file will be auto-generated from your Supabase schema
// For now, we'll define the basic types we need

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          phone_number: string | null;
          display_name: string | null;
          profile_image_url: string | null;
          bio: string | null;
          emergency_contact: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          phone_number?: string | null;
          display_name?: string | null;
          profile_image_url?: string | null;
          bio?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          phone_number?: string | null;
          display_name?: string | null;
          profile_image_url?: string | null;
          bio?: string | null;
          emergency_contact?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_status: {
        Row: {
          id: string;
          user_id: string;
          status: 'green' | 'yellow' | 'red';
          message: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status: 'green' | 'yellow' | 'red';
          message?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: 'green' | 'yellow' | 'red';
          message?: string | null;
          updated_at?: string;
        };
      };
      friendships: {
        Row: {
          id: string;
          requester_id: string;
          recipient_id: string;
          status: 'pending' | 'accepted' | 'denied';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          requester_id: string;
          recipient_id: string;
          status?: 'pending' | 'accepted' | 'denied';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          requester_id?: string;
          recipient_id?: string;
          status?: 'pending' | 'accepted' | 'denied';
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          recipient_id: string;
          message_type: 'yellow_premade' | 'red_premade' | 'custom';
          content: string;
          sent_at: string;
          read_at: string | null;
        };
        Insert: {
          id?: string;
          sender_id: string;
          recipient_id: string;
          message_type: 'yellow_premade' | 'red_premade' | 'custom';
          content: string;
          sent_at?: string;
          read_at?: string | null;
        };
        Update: {
          id?: string;
          sender_id?: string;
          recipient_id?: string;
          message_type?: 'yellow_premade' | 'red_premade' | 'custom';
          content?: string;
          sent_at?: string;
          read_at?: string | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          type: 'status_update' | 'friend_request' | 'message' | 'system';
          priority: 'high' | 'normal' | 'low';
          data: any;
          sent_at: string;
          read_at: string | null;
          delivered_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body: string;
          type: 'status_update' | 'friend_request' | 'message' | 'system';
          priority: 'high' | 'normal' | 'low';
          data?: any;
          sent_at?: string;
          read_at?: string | null;
          delivered_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          body?: string;
          type?: 'status_update' | 'friend_request' | 'message' | 'system';
          priority?: 'high' | 'normal' | 'low';
          data?: any;
          sent_at?: string;
          read_at?: string | null;
          delivered_at?: string | null;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          push_enabled: boolean;
          email_enabled: boolean;
          sms_enabled: boolean;
          yellow_status_alerts: boolean;
          red_status_alerts: boolean;
          friend_requests: boolean;
          messages: boolean;
          sound_enabled: boolean;
          haptic_enabled: boolean;
          status_visibility: 'friends' | 'public' | 'private';
          profile_visibility: 'friends' | 'public' | 'private';
          allow_friend_requests: boolean;
          show_online_status: boolean;
          show_last_seen: boolean;
          theme: 'light' | 'dark' | 'system';
          language: string;
          font_size: 'small' | 'medium' | 'large' | 'extra-large';
          reduce_motion: boolean;
          high_contrast: boolean;
          quiet_hours_enabled: boolean;
          quiet_hours_start: string;
          quiet_hours_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          push_enabled?: boolean;
          email_enabled?: boolean;
          sms_enabled?: boolean;
          yellow_status_alerts?: boolean;
          red_status_alerts?: boolean;
          friend_requests?: boolean;
          messages?: boolean;
          sound_enabled?: boolean;
          haptic_enabled?: boolean;
          status_visibility?: 'friends' | 'public' | 'private';
          profile_visibility?: 'friends' | 'public' | 'private';
          allow_friend_requests?: boolean;
          show_online_status?: boolean;
          show_last_seen?: boolean;
          theme?: 'light' | 'dark' | 'system';
          language?: string;
          font_size?: 'small' | 'medium' | 'large' | 'extra-large';
          reduce_motion?: boolean;
          high_contrast?: boolean;
          quiet_hours_enabled?: boolean;
          quiet_hours_start?: string;
          quiet_hours_end?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          push_enabled?: boolean;
          email_enabled?: boolean;
          sms_enabled?: boolean;
          yellow_status_alerts?: boolean;
          red_status_alerts?: boolean;
          friend_requests?: boolean;
          messages?: boolean;
          sound_enabled?: boolean;
          haptic_enabled?: boolean;
          status_visibility?: 'friends' | 'public' | 'private';
          profile_visibility?: 'friends' | 'public' | 'private';
          allow_friend_requests?: boolean;
          show_online_status?: boolean;
          show_last_seen?: boolean;
          theme?: 'light' | 'dark' | 'system';
          language?: string;
          font_size?: 'small' | 'medium' | 'large' | 'extra-large';
          reduce_motion?: boolean;
          high_contrast?: boolean;
          quiet_hours_enabled?: boolean;
          quiet_hours_start?: string;
          quiet_hours_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      premade_messages: {
        Row: {
          id: string;
          type: 'yellow' | 'red';
          content: string;
          category: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'yellow' | 'red';
          content: string;
          category: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'yellow' | 'red';
          content?: string;
          category?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      friends_with_status: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          profile_image_url: string | null;
          status: 'green' | 'yellow' | 'red' | null;
          message: string | null;
          status_updated_at: string | null;
          friendship_id: string;
          friends_since: string;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}; 