// Add userType field if not already present
userType: {
  type: String,
  enum: ['user', 'seller', 'admin'],
  default: 'user'
} 