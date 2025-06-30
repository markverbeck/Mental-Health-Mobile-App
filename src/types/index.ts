// Mental Health App Type Definitions
// Based on the technical specifications and database schema

// User-related types
export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
  displayName?: string;
}

export interface UserProfile extends User {
  // Extended user profile information
  bio?: string;
  emergencyContact?: string;
  notificationPreferences: NotificationPreferences;
  privacySettings: PrivacySettings;
}

// Status types
export type StatusType = 'green' | 'yellow' | 'red';

export interface UserStatus {
  id: string;
  userId: string;
  status: StatusType;
  updatedAt: string;
  message?: string; // Optional custom message
}

export interface StatusUpdate {
  status: StatusType;
  message?: string;
  timestamp: string;
}

// Friend-related types
export type FriendshipStatus = 'pending' | 'accepted' | 'denied';

export interface Friendship {
  id: string;
  requesterId: string;
  recipientId: string;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequest {
  id: string;
  requester: User;
  recipient: User;
  status: FriendshipStatus;
  createdAt: string;
}

export interface FriendWithStatus extends User {
  status: UserStatus | null;
  friendshipId: string;
  isOnline?: boolean;
  lastSeen?: string;
}

// Message types
export type MessageType = 'yellow_premade' | 'red_premade' | 'custom';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  messageType: MessageType;
  content: string;
  sentAt: string;
  readAt?: string;
}

export interface PremadeMessage {
  id: string;
  type: 'yellow' | 'red';
  content: string;
  category: string;
}

// Notification types
export interface NotificationPreferences {
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  yellowStatusAlerts: boolean;
  redStatusAlerts: boolean;
  friendRequests: boolean;
  messages: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
  };
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  type: 'status_update' | 'friend_request' | 'message' | 'system';
  priority: 'high' | 'normal' | 'low';
  timestamp: string;
  read: boolean;
}

// Privacy and settings types
export interface PrivacySettings {
  statusVisibility: 'friends' | 'public' | 'private';
  profileVisibility: 'friends' | 'public' | 'private';
  allowFriendRequests: boolean;
  showOnlineStatus: boolean;
  showLastSeen: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  reduceMotion: boolean;
  highContrast: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

// Response action types
export type ResponseAction = 'call' | 'text' | 'message';

export interface ResponseOption {
  type: ResponseAction;
  label: string;
  icon: string;
  action: () => void;
  disabled?: boolean;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Friends: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  StatusScreen: undefined;
  FriendStatus: { friendId: string; friendName: string };
  ResponseOptions: { friendId: string; status: StatusType };
};

export type FriendsStackParamList = {
  FriendsList: undefined;
  FriendRequests: undefined;
  AddFriend: undefined;
  FriendProfile: { friendId: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  PrivacySettings: undefined;
  NotificationSettings: undefined;
};

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Audio and haptic types
export interface AudioConfig {
  yellowStatusSound: string;
  redStatusSound: string;
  buttonPressSound: string;
  successSound: string;
  volume: number;
  enabled: boolean;
}

export interface HapticConfig {
  yellowStatusHaptic: 'light' | 'medium' | 'heavy';
  redStatusHaptic: 'light' | 'medium' | 'heavy';
  buttonPressHaptic: 'light' | 'medium' | 'heavy';
  enabled: boolean;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface StatusAnimationConfig extends AnimationConfig {
  type: 'pulse' | 'glow' | 'scale' | 'breathing';
  intensity: number;
}

// Real-time types
export interface RealtimeEvent {
  type: 'status_update' | 'friend_request' | 'message' | 'friend_online';
  payload: any;
  timestamp: string;
  userId: string;
}

// Crisis escalation types
export interface CrisisProtocol {
  id: string;
  name: string;
  description: string;
  steps: CrisisStep[];
  emergencyContacts: EmergencyContact[];
  enabled: boolean;
}

export interface CrisisStep {
  order: number;
  action: string;
  description: string;
  timeout?: number; // in seconds
  required: boolean;
}

export interface EmergencyContact {
  name: string;
  phoneNumber: string;
  relationship: string;
  priority: number;
}

// Analytics and metrics types
export interface UserMetrics {
  userId: string;
  statusUpdates: number;
  friendsCount: number;
  responseRate: number;
  averageResponseTime: number; // in seconds
  lastActive: string;
  totalSessionTime: number; // in minutes
}

export interface AppMetrics {
  totalUsers: number;
  activeUsers: number;
  crisisInterventions: number;
  averageResponseTime: number;
  userRetentionRate: number;
  friendNetworkGrowth: number;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component prop types
export interface StatusButtonProps {
  status: StatusType;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  animated?: boolean;
}

export interface FriendCardProps {
  friend: FriendWithStatus;
  onPress: () => void;
  onCallPress: () => void;
  onMessagePress: () => void;
  showActions?: boolean;
}

export interface ResponseButtonProps {
  type: ResponseAction;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Hook return types
export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export interface UseStatusReturn {
  currentStatus: UserStatus | null;
  updateStatus: (status: StatusType, message?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface UseFriendsReturn {
  friends: FriendWithStatus[];
  friendRequests: FriendRequest[];
  isLoading: boolean;
  error: string | null;
  sendFriendRequest: (emailOrUsername: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  denyFriendRequest: (requestId: string) => Promise<void>;
  removeFriend: (friendshipId: string) => Promise<void>;
}

export interface UseNotificationsReturn {
  notifications: PushNotification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
} 