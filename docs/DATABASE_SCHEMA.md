# Database Schema Documentation

## Overview
This document outlines the complete database schema for the Mental Health Crisis Support App using Supabase as the backend.

## Database Tables

### 1. Users Table
Stores user account information and profile data.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  display_name VARCHAR(100),
  profile_image_url TEXT,
  bio TEXT,
  emergency_contact VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_phone CHECK (phone_number ~* '^\+?[1-9]\d{1,14}$'),
  CONSTRAINT username_length CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 50)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. User_Status Table
Tracks the current mental health status of users.

```sql
CREATE TABLE user_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(10) NOT NULL CHECK (status IN ('green', 'yellow', 'red')),
  message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one status per user
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX idx_user_status_user_id ON user_status(user_id);
CREATE INDEX idx_user_status_status ON user_status(status);
CREATE INDEX idx_user_status_updated_at ON user_status(updated_at);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_status_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_status_updated_at
  BEFORE UPDATE ON user_status
  FOR EACH ROW
  EXECUTE FUNCTION update_user_status_updated_at();
```

### 3. Friendships Table
Manages friend relationships between users.

```sql
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'denied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate friendships
  UNIQUE(requester_id, recipient_id),
  -- Prevent self-friendship
  CONSTRAINT no_self_friendship CHECK (requester_id != recipient_id)
);

-- Indexes
CREATE INDEX idx_friendships_requester_id ON friendships(requester_id);
CREATE INDEX idx_friendships_recipient_id ON friendships(recipient_id);
CREATE INDEX idx_friendships_status ON friendships(status);
CREATE INDEX idx_friendships_created_at ON friendships(created_at);

-- Trigger to update updated_at timestamp
CREATE TRIGGER trigger_update_friendships_updated_at
  BEFORE UPDATE ON friendships
  FOR EACH ROW
  EXECUTE FUNCTION update_user_status_updated_at();
```

### 4. Messages Table
Stores communication between users.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('yellow_premade', 'red_premade', 'custom')),
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Prevent self-messaging
  CONSTRAINT no_self_message CHECK (sender_id != recipient_id)
);

-- Indexes
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at);
CREATE INDEX idx_messages_read_at ON messages(read_at);
CREATE INDEX idx_messages_conversation ON messages(sender_id, recipient_id, sent_at);
```

### 5. Notifications Table
Stores push notifications and in-app notifications.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('status_update', 'friend_request', 'message', 'system')),
  priority VARCHAR(10) NOT NULL CHECK (priority IN ('high', 'normal', 'low')),
  data JSONB,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_sent_at ON notifications(sent_at);
CREATE INDEX idx_notifications_read_at ON notifications(read_at);
CREATE INDEX idx_notifications_unread ON notifications(user_id, read_at) WHERE read_at IS NULL;
```

### 6. User_Settings Table
Stores user preferences and settings.

```sql
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification preferences
  push_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT false,
  yellow_status_alerts BOOLEAN DEFAULT true,
  red_status_alerts BOOLEAN DEFAULT true,
  friend_requests BOOLEAN DEFAULT true,
  messages BOOLEAN DEFAULT true,
  sound_enabled BOOLEAN DEFAULT true,
  haptic_enabled BOOLEAN DEFAULT true,
  
  -- Privacy settings
  status_visibility VARCHAR(20) DEFAULT 'friends' CHECK (status_visibility IN ('friends', 'public', 'private')),
  profile_visibility VARCHAR(20) DEFAULT 'friends' CHECK (profile_visibility IN ('friends', 'public', 'private')),
  allow_friend_requests BOOLEAN DEFAULT true,
  show_online_status BOOLEAN DEFAULT true,
  show_last_seen BOOLEAN DEFAULT true,
  
  -- App settings
  theme VARCHAR(20) DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  language VARCHAR(10) DEFAULT 'en',
  font_size VARCHAR(20) DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large', 'extra-large')),
  reduce_motion BOOLEAN DEFAULT false,
  high_contrast BOOLEAN DEFAULT false,
  
  -- Quiet hours
  quiet_hours_enabled BOOLEAN DEFAULT false,
  quiet_hours_start TIME DEFAULT '22:00',
  quiet_hours_end TIME DEFAULT '08:00',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Indexes
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);

-- Trigger to update updated_at timestamp
CREATE TRIGGER trigger_update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_user_status_updated_at();
```

### 7. Premade_Messages Table
Stores predefined messages for different status types.

```sql
CREATE TABLE premade_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(10) NOT NULL CHECK (type IN ('yellow', 'red')),
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_premade_messages_type ON premade_messages(type);
CREATE INDEX idx_premade_messages_category ON premade_messages(category);
CREATE INDEX idx_premade_messages_active ON premade_messages(is_active);

-- Insert default premade messages
INSERT INTO premade_messages (type, content, category) VALUES
-- Yellow status messages
('yellow', 'Thinking of you today', 'gentle'),
('yellow', 'How are you doing?', 'gentle'),
('yellow', 'Here if you need to talk', 'gentle'),
('yellow', 'Sending you good vibes', 'gentle'),
('yellow', 'Want to grab coffee?', 'social'),
('yellow', 'How was your day?', 'check-in'),

-- Red status messages
('red', 'I''m here for you right now', 'urgent'),
('red', 'Can I call you?', 'urgent'),
('red', 'You''re not alone - I''m here', 'urgent'),
('red', 'I care about you and want to help', 'urgent'),
('red', 'Let''s talk about what''s going on', 'supportive'),
('red', 'I want to make sure you''re okay', 'supportive');
```

### 8. User_Metrics Table
Stores analytics and usage metrics for users.

```sql
CREATE TABLE user_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Daily metrics
  status_updates INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  messages_received INTEGER DEFAULT 0,
  friends_added INTEGER DEFAULT 0,
  response_time_avg INTEGER, -- in seconds
  session_duration INTEGER, -- in minutes
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, date)
);

-- Indexes
CREATE INDEX idx_user_metrics_user_id ON user_metrics(user_id);
CREATE INDEX idx_user_metrics_date ON user_metrics(date);
```

### 9. Crisis_Protocols Table
Stores crisis escalation protocols and emergency contacts.

```sql
CREATE TABLE crisis_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  steps JSONB NOT NULL, -- Array of crisis steps
  emergency_contacts JSONB NOT NULL, -- Array of emergency contacts
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_crisis_protocols_user_id ON crisis_protocols(user_id);
CREATE INDEX idx_crisis_protocols_active ON crisis_protocols(is_active);
```

## Row Level Security (RLS) Policies

### Users Table
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### User_Status Table
```sql
ALTER TABLE user_status ENABLE ROW LEVEL SECURITY;

-- Users can view their own status
CREATE POLICY "Users can view own status" ON user_status
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own status
CREATE POLICY "Users can update own status" ON user_status
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert their own status
CREATE POLICY "Users can insert own status" ON user_status
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Friends can view each other's status
CREATE POLICY "Friends can view status" ON user_status
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM friendships 
      WHERE (requester_id = auth.uid() AND recipient_id = user_status.user_id AND status = 'accepted')
         OR (recipient_id = auth.uid() AND requester_id = user_status.user_id AND status = 'accepted')
    )
  );
```

### Friendships Table
```sql
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- Users can view friendships they're involved in
CREATE POLICY "Users can view own friendships" ON friendships
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- Users can create friend requests
CREATE POLICY "Users can create friend requests" ON friendships
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

-- Recipients can update friend requests
CREATE POLICY "Recipients can update friend requests" ON friendships
  FOR UPDATE USING (auth.uid() = recipient_id);

-- Users can delete their own friendships
CREATE POLICY "Users can delete own friendships" ON friendships
  FOR DELETE USING (auth.uid() = requester_id OR auth.uid() = recipient_id);
```

### Messages Table
```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Users can send messages
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Recipients can mark messages as read
CREATE POLICY "Recipients can update messages" ON messages
  FOR UPDATE USING (auth.uid() = recipient_id);
```

## Functions and Triggers

### Update Timestamp Function
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Friend Status Update Trigger
```sql
CREATE OR REPLACE FUNCTION notify_friend_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert notification for friends when status changes to yellow or red
  IF NEW.status IN ('yellow', 'red') THEN
    INSERT INTO notifications (user_id, title, body, type, priority, data)
    SELECT 
      f.recipient_id,
      CASE 
        WHEN NEW.status = 'yellow' THEN 'Friend needs support'
        ELSE 'Friend is in crisis'
      END,
      CASE 
        WHEN NEW.status = 'yellow' THEN 'A friend is struggling and could use your support'
        ELSE 'A friend is in crisis and needs immediate help'
      END,
      'status_update',
      CASE 
        WHEN NEW.status = 'yellow' THEN 'normal'
        ELSE 'high'
      END,
      jsonb_build_object(
        'friend_id', NEW.user_id,
        'status', NEW.status,
        'message', NEW.message
      )
    FROM friendships f
    WHERE f.requester_id = NEW.user_id 
      AND f.status = 'accepted'
      AND f.recipient_id IN (
        SELECT user_id FROM user_settings 
        WHERE (yellow_status_alerts = true AND NEW.status = 'yellow')
           OR (red_status_alerts = true AND NEW.status = 'red')
      );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_friend_status_change
  AFTER INSERT OR UPDATE ON user_status
  FOR EACH ROW
  EXECUTE FUNCTION notify_friend_status_change();
```

## Views

### Friends With Status View
```sql
CREATE VIEW friends_with_status AS
SELECT 
  u.id,
  u.username,
  u.display_name,
  u.profile_image_url,
  us.status,
  us.message,
  us.updated_at as status_updated_at,
  f.id as friendship_id,
  f.created_at as friends_since
FROM users u
JOIN friendships f ON (f.requester_id = u.id OR f.recipient_id = u.id)
LEFT JOIN user_status us ON u.id = us.user_id
WHERE f.status = 'accepted'
  AND (f.requester_id = auth.uid() OR f.recipient_id = auth.uid())
  AND u.id != auth.uid();
```

### Unread Messages Count View
```sql
CREATE VIEW unread_messages_count AS
SELECT 
  sender_id,
  COUNT(*) as unread_count
FROM messages
WHERE recipient_id = auth.uid() 
  AND read_at IS NULL
GROUP BY sender_id;
```

## Indexes Summary

### Performance Indexes
- All foreign key columns are indexed
- Frequently queried columns (status, created_at, updated_at)
- Composite indexes for common query patterns
- Partial indexes for filtered queries (e.g., unread notifications)

### Full-Text Search Indexes
```sql
-- For searching users by username or display name
CREATE INDEX idx_users_search ON users USING gin(to_tsvector('english', username || ' ' || COALESCE(display_name, '')));

-- For searching messages by content
CREATE INDEX idx_messages_search ON messages USING gin(to_tsvector('english', content));
```

## Backup and Maintenance

### Automated Backups
- Supabase provides automatic daily backups
- Point-in-time recovery available
- Cross-region backup replication

### Maintenance Tasks
```sql
-- Clean up old notifications (older than 30 days)
DELETE FROM notifications 
WHERE sent_at < NOW() - INTERVAL '30 days' 
  AND read_at IS NOT NULL;

-- Clean up old metrics (older than 1 year)
DELETE FROM user_metrics 
WHERE date < CURRENT_DATE - INTERVAL '1 year';

-- Vacuum and analyze tables
VACUUM ANALYZE;
```

## Security Considerations

### Data Encryption
- All data encrypted at rest
- TLS encryption for data in transit
- Row Level Security (RLS) enabled on all tables

### Privacy Compliance
- GDPR compliant data handling
- Right to be forgotten implementation
- Data retention policies
- Audit logging for sensitive operations

### Access Control
- JWT-based authentication
- Role-based access control
- API rate limiting
 