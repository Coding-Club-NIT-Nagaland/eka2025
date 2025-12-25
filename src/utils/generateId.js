export const generateUserId = () => {
  // Generate a random 6-character alphanumeric string
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  // Add timestamp for uniqueness
  const timestamp = Date.now().toString(36).toUpperCase();
  return `EKA-${timestamp}-${randomString}`;
};

// Example: EKA-1A2B3C-X7Y9Z0
