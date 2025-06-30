# Mental Health Crisis Support App - Technical Specifications

## Overview
A peer-to-peer mental health support app focused on quick and effective crisis communication through a simple status system and trusted friend networks.

## Core Concept
Users can quickly communicate their mental state to trusted friends using a three-button status system (Red/Yellow/Green) that triggers appropriate support responses.

## Technical Stack

### Frontend
- **React Native** (cross-platform mobile)
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Reanimated 3** for animations
- **React Native Sound** for audio
- **React Native Haptic Feedback** for haptics

### Backend
- **Supabase** for database and authentication
- **Supabase Real-time** for live updates
- **Supabase Edge Functions** for serverless functions

### Platform
- iOS and Android mobile apps
- Real-time: Supabase real-time subscriptions for status updates
- Notifications: Push notifications via React Native
- Animations: React Native Reanimated 3
- Audio: React Native Sound
- Haptics: React Native Haptic Feedback

## MVP Features

### 1. User Authentication & Registration
- User registration with email/username
- Secure login system
- User profile management

### 2. Status System
Three-button interface for mental health status:

- **Green**: "Good" - User is doing well
- **Yellow**: "Struggling" - User needs gentle support
- **Red**: "Crisis" - User is in crisis and needs immediate help

#### Visual Design:
- Large, rounded buttons (minimum 80dp height)
- Soft, approachable colors:
  - Green: #4CAF50 (calming forest green)
  - Yellow: #FFB74D (warm amber, not warning yellow)
  - Red: #FF7043 (coral red, urgent but not alarming)
- Subtle gradients and soft shadows
- Clear, friendly typography (18sp minimum)
- Gentle glow effect on selected status

#### Animations:
- Smooth color transitions when status changes (300ms ease-in-out)
- Ripple effect on button press
- Gentle pulsing animation for current status
- Breathing pattern animation during status selection

### 3. Friend Network Management
- Search for friends by username or email
- Send friend requests
- Accept/deny friend requests
- View friends list
- Remove friends capability

### 4. Notification System
**Trigger Events**: Only when friends change status to Yellow or Red (not Green)

#### Notification Types:
- Real-time push notifications when friends need help
- In-app status updates with visual indicators

#### Audio & Haptic Design:
- **Yellow Status**: Soft chime (440Hz tone, 0.3s duration) + light haptic
- **Red Status**: Gentle but urgent tone (dual tone 440-880Hz, 0.5s) + medium haptic
- Sound Settings: Always include mute/volume controls
- Accessibility: Option for vibration-only mode

#### Visual Notifications:
- Subtle badge animations on friend list
- Color-coded notification banners
- Non-intrusive toast messages with soft slide-in animation

### 5. Response Options
When receiving a Yellow or Red status notification, friends can:
- **Call**: Direct phone call integration
- **Text**: Direct SMS integration
- **Send Pre-made Message**: Choose from pre-written check-in messages

#### Visual Design:
- Action buttons with clear iconography (phone, message, chat icons)
- Consistent rounded button style (12dp border radius)
- High contrast colors for accessibility
- Loading states with gentle spinner animations
- Success feedback with checkmark animation

### 6. Pre-made Message System

#### Yellow Status Messages (Gentle):
- "Thinking of you today"
- "How are you doing?"
- "Here if you need to talk"
- "Sending you good vibes"

#### Red Status Messages (Urgent):
- "I'm here for you right now"
- "Can I call you?"
- "You're not alone - I'm here"
- "I care about you and want to help"

## User Flow

### Status Update Flow
1. User opens app
2. User sees three large status buttons (Green/Yellow/Red)
3. User taps appropriate status
4. Status is updated in real-time
5. If Yellow or Red, friends receive notifications

### Friend Response Flow
1. Friend receives push notification about status change
2. Friend opens app or responds from notification
3. Friend sees three options: Call, Text, or Send Message
4. Friend selects appropriate response method
5. Communication is initiated

### Friend Management Flow
1. User searches for friend by username/email
2. Friend request is sent
3. Recipient receives notification
4. Recipient accepts or denies request
5. If accepted, users are added to each other's friend lists

## Database Schema (Supabase)

### Users Table
```sql
users (
  id UUID PRIMARY KEY,
  username VARCHAR UNIQUE,
  email VARCHAR UNIQUE,
  phone_number VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### User_Status Table
```sql
user_status (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status VARCHAR CHECK (status IN ('green', 'yellow', 'red')),
  updated_at TIMESTAMP
)
```

### Friendships Table
```sql
friendships (
  id UUID PRIMARY KEY,
  requester_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  status VARCHAR CHECK (status IN ('pending', 'accepted', 'denied')),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Messages Table
```sql
messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  message_type VARCHAR CHECK (message_type IN ('yellow_premade', 'red_premade', 'custom')),
  content TEXT,
  sent_at TIMESTAMP
)
```

## UI/UX Design Specifications

### Color Palette
**Primary Colors:**
- Green Status: #4CAF50 (Material Design Green 500)
- Yellow Status: #FFB74D (Material Design Orange 300)
- Red Status: #FF7043 (Material Design Deep Orange 400)

**Supporting Colors:**
- Background: #FAFAFA (Warm off-white)
- Card Background: #FFFFFF with 2dp elevation
- Text Primary: #212121 (High contrast)
- Text Secondary: #757575 (Medium contrast)
- Accent: #2196F3 (Calm blue for links/actions)

### Typography
- Primary Font: System default (SF Pro on iOS, Roboto on Android)
- Headers: 24sp, Medium weight
- Body Text: 16sp, Regular weight
- Button Text: 18sp, Medium weight
- Status Labels: 20sp, Medium weight
- Line Height: 1.4x font size for readability

### Layout & Spacing
- Screen Padding: 16dp horizontal, 24dp vertical
- Card Spacing: 12dp between cards
- Button Height: Minimum 48dp (accessibility standard)
- Touch Targets: Minimum 44dp × 44dp
- Border Radius: 12dp for cards, 8dp for buttons

## Animation Specifications

### Timing Functions
- Standard transitions: 300ms ease-in-out
- Status changes: 400ms ease-in-out with slight bounce
- Micro-interactions: 150ms ease-out
- Loading states: 200ms ease-in-out

### Motion Design
- Page transitions: Slide with 80% opacity fade
- Button press: Scale down to 0.95 with haptic feedback
- Status selection: Gentle glow + scale up to 1.05
- Friend status updates: Subtle pulse + color shift

## Accessibility Features
- Minimum Contrast: 4.5:1 for normal text, 3:1 for large text
- Focus Indicators: 2dp blue outline for keyboard navigation
- Screen Reader: Semantic labels for all interactive elements
- Motion Sensitivity: Respect "reduce motion" system settings
- Font Scaling: Support up to 200% text scaling

## Audio Design

### Sound Library
- Gentle notification chimes (no jarring alerts)
- Soft button press sounds (optional)
- Success/confirmation tones
- Calming ambient sounds (optional feature)

### Audio Specifications
- Sample Rate: 44.1kHz
- Bit Depth: 16-bit
- Format: AAC/MP3
- Duration: 0.3-0.8 seconds maximum
- Volume: Respects system volume settings

## Key Features for Development

### Real-time Updates
- Use Supabase real-time subscriptions to listen for status changes
- Implement efficient state management for live updates
- Handle offline/online state gracefully

### Push Notifications
- Implement React Native push notifications
- Configure notification permissions
- Handle notification tapping to open app
- Support background notifications

### Direct Communication Integration
- Phone call integration using React Native Linking
- SMS integration using React Native SMS
- Handle permissions for phone and SMS access

### Privacy & Security
- Secure friend request system
- Data encryption for sensitive information
- Privacy controls for status visibility
- Secure authentication flow

## Non-functional Requirements

### Performance
- App launch time < 2 seconds
- Status updates propagate in < 5 seconds
- Smooth 60fps UI performance

### Reliability
- 99.9% uptime for critical features
- Graceful offline handling
- Data persistence during network issues

### Security
- End-to-end encryption for messages
- Secure user authentication
- HIPAA-compliant data handling considerations

### Accessibility
- Support for screen readers
- High contrast mode support
- Large text support
- Voice control compatibility

## Future Enhancements (Post-MVP)
- Professional counselor integration
- Crisis escalation protocols
- Mood tracking and analytics
- Group support features
- Customizable message templates
- Location-based emergency services integration

## Development Priorities
1. Basic user authentication and profiles
2. Core status system (3 buttons) with visual design
3. Friend management system with smooth animations
4. Real-time status notifications with audio/haptic feedback
5. Pre-made messaging system with engaging UI
6. Direct call/text integration with clear visual feedback
7. Polish animations and micro-interactions
8. Accessibility testing and refinement
9. Audio/haptic optimization
10. User testing and design iteration

## Success Metrics
- User engagement with status updates
- Response time to crisis situations
- Friend network growth
- User retention rates
- Crisis intervention effectiveness 