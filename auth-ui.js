// Authentication UI System - Full English Version
// Provides Login and Register forms with real authentication

// Extend authSystem with UI methods
if (window.authSystem) {
  
  // Show Login Form
  window.authSystem.showLogin = function() {
    const modal = createAuthModal('login');
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  };
  
  // Show Register Form
  window.authSystem.showRegister = function() {
    const modal = createAuthModal('register');
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  };
}

// Create Authentication Modal
function createAuthModal(type) {
  const modal = document.createElement('div');
  modal.className = 'auth-modal-overlay';
  
  const isLogin = type === 'login';
  
  modal.innerHTML = `
    <div class="auth-modal-content">
      <button class="auth-modal-close">&times;</button>
      <h2>${isLogin ? 'Login to Your Account' : 'Create New Account'}</h2>
      <p class="auth-subtitle">${isLogin ? 'Welcome back!' : 'Join us today'}</p>
      
      <form class="auth-form" id="authForm">
        ${!isLogin ? `
          <div class="form-group">
            <label>Account Type</label>
            <div class="radio-group">
              <label><input type="radio" name="type" value="email" checked> Email</label>
              <label><input type="radio" name="type" value="phone"> Phone</label>
            </div>
          </div>
        ` : ''}
        
        <div class="form-group" id="emailGroup">
          <label>Email Address</label>
          <input type="email" id="emailInput" placeholder="your@email.com" required>
        </div>
        
        <div class="form-group" id="phoneGroup" style="display:none;">
          <label>Phone Number</label>
          <div style="display:flex;gap:10px;">
            <select id="countryCode" style="width:120px;">
              <option value="+1">+1 US</option>
              <option value="+86">+86 CN</option>
              <option value="+44">+44 UK</option>
              <option value="+81">+81 JP</option>
            </select>
            <input type="tel" id="phoneInput" placeholder="1234567890" style="flex:1;">
          </div>
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="passwordInput" placeholder="Enter password" required>
        </div>
        
        ${!isLogin ? `
          <div class="form-group">
            <label>Verification Code</label>
            <div style="display:flex;gap:10px;">
              <input type="text" id="codeInput" placeholder="Enter code" required style="flex:1;">
              <button type="button" id="sendCodeBtn" class="send-code-btn">Send Code</button>
            </div>
            <small class="code-hint">Check console for verification code (testing mode)</small>
          </div>
        ` : ''}
        
        <button type="submit" class="auth-submit-btn">${isLogin ? 'Login' : 'Register'}</button>
        
        <div class="auth-switch">
          ${isLogin ? 
            "Don't have an account? <a href='#' id='switchToRegister'>Register</a>" :
            "Already have an account? <a href='#' id='switchToLogin'>Login</a>"
          }
        </div>
      </form>
      
      <div id="authMessage" class="auth-message"></div>
    </div>
  `;
  
  // Add styles
  if (!document.getElementById('auth-ui-styles')) {
    const style = document.createElement('style');
    style.id = 'auth-ui-styles';
    style.textContent = `
      .auth-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .auth-modal-overlay.show { opacity: 1; }
      .auth-modal-content {
        background: white;
        border-radius: 12px;
        padding: 40px;
        max-width: 450px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      .auth-modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #999;
        line-height: 1;
      }
      .auth-modal-close:hover { color: #333; }
      .auth-modal-content h2 {
        margin: 0 0 10px 0;
        font-size: 24px;
        color: #333;
      }
      .auth-subtitle {
        color: #666;
        margin: 0 0 30px 0;
      }
      .auth-form .form-group {
        margin-bottom: 20px;
      }
      .auth-form label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
      }
      .auth-form input[type="email"],
      .auth-form input[type="tel"],
      .auth-form input[type="text"],
      .auth-form input[type="password"],
      .auth-form select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.3s;
      }
      .auth-form input:focus,
      .auth-form select:focus {
        outline: none;
        border-color: #667eea;
      }
      .radio-group {
        display: flex;
        gap: 20px;
      }
      .radio-group label {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: normal;
      }
      .send-code-btn {
        padding: 12px 20px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        white-space: nowrap;
        font-weight: 600;
      }
      .send-code-btn:hover { background: #5568d3; }
      .send-code-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      .code-hint {
        color: #666;
        font-size: 12px;
        margin-top: 5px;
        display: block;
      }
      .auth-submit-btn {
        width: 100%;
        padding: 14px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
      }
      .auth-submit-btn:hover { background: #5568d3; }
      .auth-switch {
        text-align: center;
        margin-top: 20px;
        color: #666;
      }
      .auth-switch a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
      }
      .auth-switch a:hover { text-decoration: underline; }
      .auth-message {
        margin-top: 15px;
        padding: 12px;
        border-radius: 6px;
        display: none;
        font-size: 14px;
      }
      .auth-message.success {
        background: #d4edda;
        color: #155724;
        display: block;
      }
      .auth-message.error {
        background: #f8d7da;
        color: #721c24;
        display: block;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Event handlers
  setupModalEvents(modal, isLogin);
  
  return modal;
}

function setupModalEvents(modal, isLogin) {
  // Close button
  modal.querySelector('.auth-modal-close').onclick = () => {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  };
  
  // Click outside to close
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  };
  
  // Switch between email/phone (register only)
  if (!isLogin) {
    const typeRadios = modal.querySelectorAll('input[name="type"]');
    typeRadios.forEach(radio => {
      radio.onchange = (e) => {
        const isEmail = e.target.value === 'email';
        modal.querySelector('#emailGroup').style.display = isEmail ? 'block' : 'none';
        modal.querySelector('#phoneGroup').style.display = isEmail ? 'none' : 'block';
      };
    });
    
    // Send verification code
    modal.querySelector('#sendCodeBtn').onclick = async function() {
      const btn = this;
      const type = modal.querySelector('input[name="type"]:checked').value;
      const contact = type === 'email' ?
        modal.querySelector('#emailInput').value :
        modal.querySelector('#phoneInput').value;
      
      if (!contact) {
        showMessage(modal, 'Please enter your ' + type, 'error');
        return;
      }
      
      btn.disabled = true;
      btn.textContent = 'Sending...';
      
      const result = await window.authSystem.sendVerificationCode(contact, type);
      
      if (result.success) {
        showMessage(modal, result.message + ' Code: ' + result.code, 'success');
        let countdown = 60;
        btn.textContent = countdown + 's';
        const timer = setInterval(() => {
          countdown--;
          if (countdown <= 0) {
            clearInterval(timer);
            btn.disabled = false;
            btn.textContent = 'Send Code';
          } else {
            btn.textContent = countdown + 's';
          }
        }, 1000);
      } else {
        showMessage(modal, result.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Send Code';
      }
    };
  }
  
  // Form submission
  modal.querySelector('#authForm').onsubmit = async (e) => {
    e.preventDefault();
    
    const messageEl = modal.querySelector('#authMessage');
    const password = modal.querySelector('#passwordInput').value;
    
    if (isLogin) {
      // Login
      const email = modal.querySelector('#emailInput').value;
      const result = window.authSystem.login(email, password);
      
      if (result.success) {
        showMessage(modal, 'Login successful!', 'success');
        setTimeout(() => {
          modal.classList.remove('show');
          setTimeout(() => modal.remove(), 300);
          location.reload();
        }, 1000);
      } else {
        showMessage(modal, result.message, 'error');
      }
    } else {
      // Register
      const type = modal.querySelector('input[name="type"]:checked').value;
      const contact = type === 'email' ?
        modal.querySelector('#emailInput').value :
        modal.querySelector('#phoneInput').value;
      const countryCode = type === 'phone' ?
        modal.querySelector('#countryCode').value : null;
      const code = modal.querySelector('#codeInput').value;
      
      const result = await window.authSystem.register({
        type,
        contact,
        countryCode,
        password,
        verificationCode: code
      });
      
      if (result.success) {
        showMessage(modal, 'Registration successful! Redirecting...', 'success');
        setTimeout(() => {
          modal.classList.remove('show');
          setTimeout(() => modal.remove(), 300);
          location.reload();
        }, 1500);
      } else {
        showMessage(modal, result.message, 'error');
      }
    }
  };
  
  // Switch forms
  const switchLink = modal.querySelector(isLogin ? '#switchToRegister' : '#switchToLogin');
  if (switchLink) {
    switchLink.onclick = (e) => {
      e.preventDefault();
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
        if (isLogin) {
          window.authSystem.showRegister();
        } else {
          window.authSystem.showLogin();
        }
      }, 300);
    };
  }
}

function showMessage(modal, message, type) {
  const messageEl = modal.querySelector('#authMessage');
  messageEl.textContent = message;
  messageEl.className = 'auth-message ' + type;
}

console.log('Auth UI System loaded successfully');
