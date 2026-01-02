// Multi-Language System for Cross-Border E-Commerce
// 多语言系统

const translations = {
  'zh-CN': {
    // 导航
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.cart': '购物车',
    'nav.login': '登录',
    'nav.register': '注册',
    // 产品
    'products.title': '我们的产品',
    'products.all': '所有产品',
    'products.addToCart': '添加到购物车',
    // 购物车
    'cart.title': '购物车',
    'cart.checkout': '结账',
    'cart.total': '总计,
        // Hero
        'Welcome to Global Shop': '欢迎来到Global Shop',
        'Your trusted cross-border e-commerce platform': '您信赖的跨境电商平台',
        'Shop Now': '立即购物',
        'Account': '账户',
        'Cart': '购物车',
        '首页': '首页',
        '产品': '产品'
  },
  'en': {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'products.title': 'Our Products',
    'products.all': 'All Products',
    'products.addToCart': 'Add to Cart',
    'cart.title': 'Shopping Cart',
    'cart.checkout': 'Checkout',
    'cart.total': 'Total,
        // Hero 
        'Welcome to Global Shop': 'Welcome to Global Shop',
        'Your trusted cross-border e-commerce platform': 'Your trusted cross-border e-commerce platform',
        'Shop Now': 'Shop Now',
        'Account': 'Account',
        'Cart': 'Cart',
        '首页': 'Home',
        '产品': 'Products'
  },
  'es': {
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.cart': 'Carrito',
    'nav.login': 'Iniciar sesi\u00f3n',
    'nav.register': 'Registrarse',
    'products.title': 'Nuestros Productos',
    'products.all': 'Todos los Productos',
    'products.addToCart': 'A\u00f1adir al Carrito',
    'cart.title': 'Carrito de Compras',
    'cart.checkout': 'Pagar',
    'cart.total': 'Total'
  },
  'de': {
    'nav.home': 'Startseite',
    'nav.products': 'Produkte',
    'nav.cart': 'Warenkorb',
    'nav.login': 'Anmelden',
    'nav.register': 'Registrieren',
    'products.title': 'Unsere Produkte',
    'products.all': 'Alle Produkte',
    'products.addToCart': 'In den Warenkorb',
    'cart.title': 'Warenkorb',
    'cart.checkout': 'Zur Kasse',
    'cart.total': 'Gesamt'
  },
  'fr': {
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.cart': 'Panier',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'products.title': 'Nos Produits',
    'products.all': 'Tous les Produits',
    'products.addToCart': 'Ajouter au Panier',
    'cart.title': 'Panier',
    'cart.checkout': 'Commander',
    'cart.total': 'Total'
  },
  'ja': {
    'nav.home': '\u30db\u30fc\u30e0',
    'nav.products': '\u5546\u54c1',
    'nav.cart': '\u30ab\u30fc\u30c8',
    'nav.login': '\u30ed\u30b0\u30a4\u30f3',
    'nav.register': '\u767b\u9332',
    'products.title': '\u5546\u54c1\u4e00\u89a7',
    'products.all': '\u3059\u3079\u3066\u306e\u5546\u54c1',
    'products.addToCart': '\u30ab\u30fc\u30c8\u306b\u5165\u308c\u308b',
    'cart.title': '\u30b7\u30e7\u30c3\u30d4\u30f3\u30b0\u30ab\u30fc\u30c8',
    'cart.checkout': '\u304a\u652f\u6255\u3044',
    'cart.total': '\u5408\u8a08'
  }
};

const languages = [
  { code: 'en', name: 'English', flag: '\ud83c\uddfa\ud83c\uddf8' },
  { code: 'zh-CN', name: '\u7b80\u4f53\u4e2d\u6587', flag: '\ud83c\udde8\ud83c\uddf3' },
  { code: 'es', name: 'Espa\u00f1ol', flag: '\ud83c\uddea\ud83c\uddf8' },
  { code: 'de', name: 'Deutsch', flag: '\ud83c\udde9\ud83c\uddea' },
  { code: 'fr', name: 'Fran\u00e7ais', flag: '\ud83c\uddeb\ud83c\uddf7' },
  { code: 'ja', name: '\u65e5\u672c\u8a9e', flag: '\ud83c\uddef\ud83c\uddf5' }
];

class LanguageManager {
  constructor() {
    this.currentLang = this.loadLanguage();
    this.initLanguageSelector();
    this.translatePage();
  }

  loadLanguage() {
    return localStorage.getItem('language') || 'en';
  }

  saveLanguage(lang) {
    localStorage.setItem('language', lang);
    this.currentLang = lang;
  }

  translate(key) {
    return translations[this.currentLang][key] || key;
  }

  changeLanguage(lang) {
    this.saveLanguage(lang);
    this.translatePage();
    window.location.reload();
  }

  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.translate(key);
    });
  }

          // Also translate text content directly
        const elementsToTranslate = [
            { selector: '.hero-content h1', fallback: 'Welcome to Global Shop' },
            { selector: '.hero-content p', fallback: 'Your trusted cross-border e-commerce platform' },
            { selector: '.cta-button', fallback: 'Shop Now' }
        ];
        
        elementsToTranslate.forEach(({ selector, fallback }) => {
            const element = document.querySelector(selector);
            if (element) {
                const originalText = element.textContent.trim();
                const translated = this.translate(originalText) || this.translate(fallback);
                if (translated && translated !== originalText) {
                    element.textContent = translated;
                }
            }
        });

  initLanguageSelector() {
    const existingSelector = document.querySelector('.language-selector');
    if (existingSelector) return;

    const nav = document.querySelector('nav .nav-content');
    if (!nav) return;

    const selector = document.createElement('div');
    selector.className = 'language-selector';
    selector.style.cssText = `
      position: relative;
      display: inline-block;
    `;

    const current = languages.find(l => l.code === this.currentLang);
    const button = document.createElement('button');
    button.className = 'lang-button';
    button.innerHTML = `${current.flag} ${current.name} \u25bc`;
    button.style.cssText = `
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    `;

    const dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      top: 45px;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      display: none;
      min-width: 180px;
      z-index: 1000;
    `;

    languages.forEach(lang => {
      const option = document.createElement('div');
      option.className = 'lang-option';
      option.innerHTML = `${lang.flag} ${lang.name}`;
      option.style.cssText = `
        padding: 10px 16px;
        cursor: pointer;
        transition: background 0.2s;
      `;
      option.onmouseover = () => option.style.background = '#f5f5f5';
      option.onmouseout = () => option.style.background = 'white';
      option.onclick = () => {
        this.changeLanguage(lang.code);
        dropdown.style.display = 'none';
      };
      dropdown.appendChild(option);
    });

    button.onclick = () => {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    };

    document.addEventListener('click', (e) => {
      if (!selector.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    selector.appendChild(button);
    selector.appendChild(dropdown);
    nav.appendChild(selector);
  }
}

window.languageManager = new LanguageManager();
window.languages = languages;
