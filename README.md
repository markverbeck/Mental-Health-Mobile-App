# Mental Health Crisis Support App

A peer-to-peer mental health support app focused on quick and effective crisis communication through a simple status system and trusted friend networks.

## 🎯 Core Concept

Users can quickly communicate their mental state to trusted friends using a three-button status system (Red/Yellow/Green) that triggers appropriate support responses.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MentalHealthApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

5. **Run the app**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 🏗️ Technical Stack

- **Frontend**: React Native (cross-platform mobile)
- **Backend**: Supabase
- **Platform**: iOS and Android mobile apps
- **Real-time**: Supabase real-time subscriptions
- **Notifications**: Push notifications via React Native
- **Animations**: React Native Reanimated 3
- **Audio**: React Native Sound
- **Haptics**: React Native Haptic Feedback

## 📱 MVP Features

### 1. User Authentication & Registration
- User registration with email/username
- Secure login system
- User profile management

### 2. Status System
Three-button interface for mental health status:
- **Green**: "Good" - User is doing well
- **Yellow**: "Struggling" - User needs gentle support  
- **Red**: "Crisis" - User is in crisis and needs immediate help

### 3. Friend Network Management
- Search for friends by username or email
- Send/accept/deny friend requests
- View friends list
- Remove friends capability

### 4. Notification System
- Real-time push notifications for Yellow/Red status changes
- Audio & haptic feedback
- Visual notification indicators

### 5. Response Options
- Direct phone call integration
- Direct SMS integration
- Pre-made message system

## 🎨 Design System

### Color Palette
- **Green Status**: #4CAF50 (Material Design Green 500)
- **Yellow Status**: #FFB74D (Material Design Orange 300)
- **Red Status**: #FF7043 (Material Design Deep Orange 400)
- **Background**: #FAFAFA (Warm off-white)
- **Text Primary**: #212121 (High contrast)

### Typography
- **Headers**: 24sp, Medium weight
- **Body Text**: 16sp, Regular weight
- **Button Text**: 18sp, Medium weight
- **Status Labels**: 20sp, Medium weight

## 🗄️ Database Schema

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

## 🔧 Development

### Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── navigation/     # Navigation configuration
├── services/       # API and external services
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── constants/      # App constants
└── types/          # TypeScript type definitions
```

### Key Development Commands
```bash
# Start Metro bundler
npx react-native start

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android

# Run tests
npm test

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 📊 Performance Requirements

- App launch time < 2 seconds
- Status updates propagate in < 5 seconds
- Smooth 60fps UI performance
- 99.9% uptime for critical features

## 🔒 Security & Privacy

- End-to-end encryption for messages
- Secure user authentication
- HIPAA-compliant data handling considerations
- Privacy controls for status visibility

## ♿ Accessibility

- Support for screen readers
- High contrast mode support
- Large text support (up to 200% scaling)
- Voice control compatibility
- Minimum 4.5:1 contrast ratio

## 🚀 Future Enhancements

- Professional counselor integration
- Crisis escalation protocols
- Mood tracking and analytics
- Group support features
- Customizable message templates
- Location-based emergency services integration

## 📈 Success Metrics

- User engagement with status updates
- Response time to crisis situations
- Friend network growth
- User retention rates
- Crisis intervention effectiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

[Add your license information here]

## 🆘 Support

For support and questions, please contact [your contact information] 