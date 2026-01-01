// Authentication System with Phone/Email Verification
// 认证系统（手机/邮箱验证）

// 国家区号列表
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

  // 从 localStorage 加载用户
  loadUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // 保存用户到 localStorage
  saveUser(user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // 生成验证码
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 发送验证码 (模拟)
  async sendVerificationCode(contact, type = 'phone') {
    const code = this.generateVerificationCode();
    this.verificationCodes[contact] = {
      code: code,
      timestamp: Date.now(),
      expiresIn: 5 * 60 * 1000 // 5分钟过期
    };

    // 模拟发送延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Verification code for ${contact}: ${code}`);
        // 在生产环境中，这里会调用真实的 SMS/Email API
        resolve({
          success: true,
          message: type === 'phone' 
            ? '验证码已发送到您的手机' 
            : '验证码已发送到您的邮箱',
          code: code // 仅用于测试，生产环境不返回
        });
      }, 1000);
    });
  }

  // 验证验证码
  verifyCode(contact, code) {
    const stored = this.verificationCodes[contact];
    
    if (!stored) {
      return { success: false, message: '验证码不存在' };
    }

    if (Date.now() - stored.timestamp > stored.expiresIn) {
      delete this.verificationCodes[contact];
      return { success: false, message: '验证码已过期' };
    }

    if (stored.code !== code) {
      return { success: false, message: '验证码错误' };
    }

    delete this.verificationCodes[contact];
    return { success: true, message: '验证成功' };
  }

  // 注册
  async register(data) {
    const { type, contact, countryCode, password, verificationCode } = data;

    // 验证验证码
    const verification = this.verifyCode(contact, verificationCode);
    if (!verification.success) {
      return verification;
    }

    // 检查用户是否已存在
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find(u => u.contact === contact);
    
    if (exists) {
      return { success: false, message: '该账号已注册' };
    }

    // 创建新用户
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

    // 登录用户
    this.saveUser(newUser);

    return { success: true, message: '注册成功', user: newUser };
  }

  // 登录
  login(contact, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.contact === contact && u.password === password);

    if (!user) {
      return { success: false, message: '账号或密码错误' };
    }

    this.saveUser(user);
    return { success: true, message: '登录成功', user };
  }

  // 退出登录
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // 获取当前用户
  getCurrentUser() {
    return this.currentUser;
  }

  // 检查是否已登录
  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// 创建全局认证实例
window.authSystem = new AuthSystem();
window.countryCodes = countryCodes;
