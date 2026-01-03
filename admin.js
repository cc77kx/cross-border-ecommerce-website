// Admin Dashboard JavaScript

// Initialize dashboard on page load
window.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadRecentOrders();
    loadProductInventory();
    setupFormHandlers();
});

// Load dashboard statistics
function loadDashboardStats() {
    // Simulated stats (in production, fetch from backend API)
    const stats = {
        totalRevenue: '$12,458',
        totalOrders: 248,
        totalProducts: 42,
        pendingOrders: 12
    };
    
    // Update stats in the UI
    document.getElementById('total-revenue').textContent = stats.totalRevenue;
    document.getElementById('total-orders').textContent = stats.totalOrders;
    document.getElementById('total-products').textContent = stats.totalProducts;
    document.getElementById('pending-orders').textContent = stats.pendingOrders;
}

// Load recent orders
function loadRecentOrders() {
    // Simulated orders data
    const orders = [
        { id: 'ORD-001', customer: 'John Doe', total: '$125.00', status: 'Completed', date: '2024-01-15' },
        { id: 'ORD-002', customer: 'Jane Smith', total: '$89.50', status: 'Pending', date: '2024-01-16' },
        { id: 'ORD-003', customer: 'Bob Johnson', total: '$210.00', status: 'Processing', date: '2024-01-16' }
    ];
    
    const tableBody = document.getElementById('orders-table-body');
    tableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.total}</td>
            <td><span class="status ${order.status.toLowerCase()}">${order.status}</span></td>
            <td>${order.date}</td>
            <td><button class="btn-sm" onclick="viewOrder('${order.id}')">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Load product inventory
function loadProductInventory() {
    // Simulated product data
    const products = [
        { id: 1, name: 'Wireless Headphones', stock: 45, price: '$79.99' },
        { id: 2, name: 'Smart Watch', stock: 23, price: '$199.99' },
        { id: 3, name: 'Laptop Stand', stock: 67, price: '$34.99' }
    ];
    
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.stock}</td>
            <td>${product.price}</td>
            <td>
                <button class="btn-sm" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Setup form handlers
function setupFormHandlers() {
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
}

// Save settings
function saveSettings() {
    const storeName = document.querySelector('input[value="Global Shop"]').value;
    const storeEmail = document.querySelector('input[value="contact@globalshop.com"]').value;
    const currency = document.querySelector('select').value;
    
    // In production, send to backend API
    console.log('Saving settings:', { storeName, storeEmail, currency });
    
    // Show success message
    alert('Settings saved successfully!');
}

// View order details
function viewOrder(orderId) {
    alert(`Viewing order: ${orderId}\nThis would open a detailed order view.`);
}

// Edit product
function editProduct(productId) {
    alert(`Editing product ID: ${productId}\nThis would open a product edit form.`);
}

// Delete product
function deleteProduct(productId) {
    if (confirm(`Are you sure you want to delete product ID: ${productId}?`)) {
        // In production, call backend API to delete
        console.log('Deleting product:', productId);
        loadProductInventory(); // Reload the list
    }
}

// Navigation functions
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard-section').style.display = 'block';
    updateActiveNav('dashboard');
}

function showOrders() {
    hideAllSections();
    document.getElementById('orders-section').style.display = 'block';
    updateActiveNav('orders');
}

function showProducts() {
    hideAllSections();
    document.getElementById('products-section').style.display = 'block';
    updateActiveNav('products');
}

function showSettings() {
    hideAllSections();
    document.getElementById('settings-section').style.display = 'block';
    updateActiveNav('settings');
}

function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
}

function updateActiveNav(activeItem) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNav = document.querySelector(`[onclick*="show${activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}
