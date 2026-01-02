// Shopping Cart Management System
// 购物车管理系统

class ShoppingCart {
  constructor() {
    this.cart = this.loadCart();
    this.updateCartBadge();
  }

  // 从 localStorage 加载购物车
  loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // 保存购物车到 localStorage  
  saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    this.updateCartBadge();
  }

  // 添加商品到购物车
  addToCart(product) {
    // 检查商品是否已存在（相同ID和规格）
    const existingItem = this.cart.find(item => 
      item.id === product.id && 
      JSON.stringify(item.selectedSpec) === JSON.stringify(product.selectedSpec)
    );

    if (existingItem) {
      // 如果存在，增加数量
      existingItem.quantity += product.quantity || 1;
    } else {
      // 如果不存在，添加新商品
      this.cart.push({
        ...product,
        quantity: product.quantity || 1,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    this.showNotification('Item added to cart!', 'success');
    return true;
  }

  // 从购物车移除商品
  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.showNotification('Item removed from cart', 'info');
  }

  // 更新商品数量
  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.cart[index].quantity = quantity;
      this.saveCart();
    }
  }

  // 获取购物车商品
  getCart() {
    return this.cart;
  }

  // 获取购物车商品总数
  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // 计算购物车总价
  getCartTotal() {
    return this.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  }

  // 清空购物车
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // 更新购物车徽章
  updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    const count = this.getCartCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // 显示通知
  showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 25px;
      background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// 创建全局购物车实例
window.cart = new ShoppingCart();

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
