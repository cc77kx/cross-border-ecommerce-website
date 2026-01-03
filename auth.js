// Authentication System with Phone/Email Verification
// English Version - No Chinese text

// Country codes list
const countryCodes = [
  { code: '+1', country: 'US', name: 'United States' },
  { code: '+86', country: 'CN', name: 'China' },
  { code: '+44', country: 'UK', name: 'United Kingdom' },
  { code: '+81', country: 'JP', name: 'Japan' },
  { code: '+82', country: 'KR', name: 'South Korea' },
  { code: '+852', country: 'HK', name: 'Hong Kong' },
  { code: '+886', country: 'TW', name: 'Taiwan' },
  { code: '+65', country: 'SG', name: 'Singapore' },
  { code: '+60', country: 'MY', name: 'Malaysia' },
  { code: '+66', country: 'TH', name: 'Thailand' },
  { code: '+84', country: 'VN', name: 'Vietnam' },
  { code: '+91', country: 'IN', name: 'India' },
  { code: '+61', country: 'AU', name: 'Australia' },
  { code: '+64', country: 'NZ', name: 'New Zealand' },
  { code: '+33', country: 'FR', name: 'France' },
  { code: '+49', country: 'DE', name: 'Germany' },
  { code: '+39', country: 'IT', name: 'Italy' },
  { code: '+34', country: 'ES', name: 'Spain' },
  { code: '+7', country: 'RU', name: 'Russia' },
  { code: '+55', country: 'BR', name: 'Brazil' },
  { code: '+52', country: 'MX', name: 'Mexico' },
  { code: '+971', country: 'AE', name: 'UAE' }
];

class AuthSystem {
  constructor() {
    this.currentUser = this.loadUser();
    this.verificationCodes = {};
  }

  // Load user from localStorage
  loadUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Save user to localStorage
  saveUser(user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Generate verification code
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send verification code (simulation)
  async sendVerificationCode(contact, type = 'phone') {
    const code = this.generateVerificationCode();
    this.verificationCodes[contact] = {
      code: code,
      timestamp: Date.now(),
      expiresIn: 5 * 60 * 1000 // Expires in 5 minutes
    };

    // Simulate sending delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Verification code for ${contact}: ${code}`);
        // In production, this would call a real SMS/Email API
        resolve({
          success: true,
          message: type === 'phone' 
            ? 'Verification code sent to your phone' 
            : 'Verification code sent to your email',
          code: code // Only for testing, don't return in production
        });
      }, 1000);
    });
  }

  // Verify code
  verifyCode(contact, code) {
    const stored = this.verificationCodes[contact];
    
    if (!stored) {
      return { success: false, message: 'Verification code does not exist' };
    }

    if (Date.now() - stored.timestamp > stored.expiresIn) {
      delete this.verificationCodes[contact];
      return { success: false, message: 'Verification code has expired' };
    }

    if (stored.code !== code) {
      return { success: false, message: 'Incorrect verification code' };
    }

    delete this.verificationCodes[contact];
    return { success: true, message: 'Verification successful' };
  }

  // Register
  async register(data) {
    const { type, contact, countryCode, password, verificationCode } = data;

    // Verify code
    const verification = this.verifyCode(contact, verificationCode);
    if (!verification.success) {
      return verification;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.contact === contact);
    
    if (exists) {
      return { success: false, message: 'This account is already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      type,
      contact,
      countryCode: type === 'phone' ? countryCode : null,
      password,
      createdAt: new Date().toISOString(),
      verified: true
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log in the user
    this.saveUser(newUser);

    return { success: true, message: 'Registration successful', user: newUser };
  }

  // Login
  login(contact, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.contact === contact && u.password === password);

    if (!user) {
      return { success: false, message: 'Incorrect email or password' };
    }

    this.saveUser(user);
    return { success: true, message: 'Login successful', user };
  }

  // Logout
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if logged in
  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// Create global auth instance
window.authSystem = new AuthSystem();
window.countryCodes = countryCodes;
