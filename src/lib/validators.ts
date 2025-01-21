export function validateEmail(email: string): boolean {
  if (!email || !email.includes('@') || email.length > 50) {
    return false;
  }
  return true;
}

export function validatePassword(password: string, email: string): string | null {
  if (password.length < 6 || password.length > 12) {
    return 'Password must be between 6 and 12 characters';
  }

  if (email && password.toLowerCase().includes(email.toLowerCase())) {
    return 'Password cannot contain your email address';
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (!hasUpperCase) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!hasLowerCase) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!hasNumber) {
    return 'Password must contain at least one number';
  }
  if (!hasSpecialChar) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }

  return null;
}