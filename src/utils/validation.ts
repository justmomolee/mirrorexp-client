// Input sanitization and validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Sanitize input by trimming whitespace and removing potentially dangerous characters
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
};

/**
 * Sanitize email - lowercase and trim
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
  const sanitized = sanitizeEmail(email);

  if (sanitized.length < 5) {
    return { isValid: false, error: 'Email must be at least 5 characters long' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (sanitized.length > 225) {
    return { isValid: false, error: 'Email is too long (max 225 characters)' };
  }

  return { isValid: true };
};

/**
 * Validate username
 */
export const validateUsername = (username: string): ValidationResult => {
  const sanitized = sanitizeInput(username);

  if (sanitized.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters long' };
  }

  if (sanitized.length > 20) {
    return { isValid: false, error: 'Username must be less than 20 characters' };
  }

  // Only allow alphanumeric and underscores
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(sanitized)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }

  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (password.length < 5) {
    return { isValid: false, error: 'Password must be at least 5 characters long' };
  }

  if (password.length > 20) {
    return { isValid: false, error: 'Password must be less than 20 characters' };
  }

  return { isValid: true };
};

/**
 * Validate OTP code
 */
export const validateOtp = (otp: string): ValidationResult => {
  const sanitized = otp.trim();

  if (sanitized.length !== 6) {
    return { isValid: false, error: 'OTP must be exactly 6 digits' };
  }

  if (!/^\d{6}$/.test(sanitized)) {
    return { isValid: false, error: 'OTP must contain only numbers' };
  }

  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): ValidationResult => {
  const sanitized = phone.trim();

  if (sanitized.length < 3) {
    return { isValid: false, error: 'Phone number is too short' };
  }

  if (sanitized.length > 15) {
    return { isValid: false, error: 'Phone number is too long (max 15 characters)' };
  }

  // Allow numbers, spaces, dashes, parentheses, and plus sign
  const phoneRegex = /^[0-9\s\-\(\)\+]+$/;
  if (!phoneRegex.test(sanitized)) {
    return { isValid: false, error: 'Phone number contains invalid characters' };
  }

  return { isValid: true };
};

/**
 * Validate name (first name, last name)
 */
export const validateName = (name: string, fieldName: string = 'Name'): ValidationResult => {
  const sanitized = sanitizeInput(name);

  if (sanitized.length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }

  if (sanitized.length > 20) {
    return { isValid: false, error: `${fieldName} must be less than 20 characters` };
  }

  // Only allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(sanitized)) {
    return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }

  return { isValid: true };
};

/**
 * Validate full name doesn't exceed model limit
 */
export const validateFullName = (firstName: string, lastName: string): ValidationResult => {
  const sanitizedFirst = sanitizeInput(firstName);
  const sanitizedLast = sanitizeInput(lastName);
  const fullName = `${sanitizedFirst} ${sanitizedLast}`;

  if (fullName.length > 20) {
    return {
      isValid: false,
      error: `Full name is too long (${fullName.length} characters). Please use shorter names (max 20 characters total)`
    };
  }

  return { isValid: true };
};

/**
 * Validate address field
 */
export const validateAddress = (address: string, fieldName: string = 'Address'): ValidationResult => {
  const sanitized = sanitizeInput(address);

  if (sanitized.length < 3) {
    return { isValid: false, error: `${fieldName} must be at least 3 characters long` };
  }

  if (sanitized.length > 50) {
    return { isValid: false, error: `${fieldName} is too long (max 50 characters)` };
  }

  return { isValid: true };
};

/**
 * Validate combined address doesn't exceed model limit
 */
export const validateCombinedAddress = (streetAddress: string, optionalAddress: string): ValidationResult => {
  const sanitizedStreet = sanitizeInput(streetAddress);
  const sanitizedOptional = sanitizeInput(optionalAddress);
  const combined = sanitizedOptional ? `${sanitizedStreet} ${sanitizedOptional}` : sanitizedStreet;

  if (combined.length > 50) {
    return {
      isValid: false,
      error: `Combined address is too long (${combined.length} characters). Please shorten it (max 50 characters)`
    };
  }

  return { isValid: true };
};

/**
 * Validate zip code
 */
export const validateZipCode = (zipCode: string): ValidationResult => {
  const sanitized = zipCode.trim();

  if (sanitized.length < 3) {
    return { isValid: false, error: 'Zip code must be at least 3 characters' };
  }

  if (sanitized.length > 10) {
    return { isValid: false, error: 'Zip code is too long (max 10 characters)' };
  }

  // Allow alphanumeric and dashes
  const zipRegex = /^[a-zA-Z0-9\-\s]+$/;
  if (!zipRegex.test(sanitized)) {
    return { isValid: false, error: 'Zip code contains invalid characters' };
  }

  return { isValid: true };
};

/**
 * Get user-friendly error message from server error
 */
export const getFriendlyErrorMessage = (error: any): string => {
  const errorMessage = error?.message || error || 'An unexpected error occurred';

  // Map common server errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'user not found': 'Account not found. Please check your credentials or sign up.',
    'Invalid password': 'Incorrect password. Please try again.',
    'username or email already exists, please login': 'This email or username is already registered. Please log in instead.',
    'Email is required': 'Please enter your email address.',
    'Invalid email': 'Please enter a valid email address.',
    'Invalid token': 'Invalid or expired verification code. Please request a new one.',
    'User not found': 'Account not found. Please check your email or sign up.',
    'Something Went Wrong...': 'We encountered an error. Please try again in a moment.',
    'Please complete the CAPTCHA verification': 'Please verify you\'re not a robot by completing the CAPTCHA.',
    'Network request failed': 'Connection error. Please check your internet and try again.',
    'Failed to fetch': 'Unable to connect to server. Please check your connection.',
  };

  // Check for exact matches
  for (const [key, value] of Object.entries(errorMap)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  // Return original message if no mapping found, but clean it up
  if (errorMessage.includes('\"')) {
    return errorMessage.replace(/"/g, '');
  }

  return errorMessage;
};
