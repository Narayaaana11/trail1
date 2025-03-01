    let orders = [];
    let activeTab = 'pending'; // Track current tab
    let selectedOrderId = null; // Track selected order

    // Mock user data (in a real app, this would come from a backend)
    const currentUser = {
    name: "Canteen Partner",
    avatar: "user-avatar.png"
};

    // Function to generate random 4-digit number
    function generateOrderNumber() {
    return Math.floor(1000 + Math.random() * 9000); // Generates 1000-9999
}

    // Function to initialize the app
    function initApp() {
    document.getElementById('user-name').textContent = currentUser.name;

    document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', switchTab);
});

    document.querySelector('.confirm').addEventListener('click', confirmOrder);
    document.querySelector('.out-of-stock').addEventListener('click', markOutOfStock);

    document.querySelector('.menu-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'Menu.html';
});

    document.querySelector('.tab:nth-child(1)').classList.add('active');
    updateActionButtons(); // Set initial button text
}

    // Function to add new order
    function addOrder(orderData) {
    const newOrder = {
    id: generateOrderNumber(), // Random 4-digit number
    customerName: orderData.customerName,
    items: orderData.items,
    total: orderData.total,
    timestamp: new Date().toLocaleTimeString(),
    status: 'pending'
};
    orders.push(newOrder);
    updateOrderList();
    updateTabCounts();
}

    // Function to update order list display
    function updateOrderList() {
    const orderList = document.querySelector('.order-list');
    orderList.innerHTML = '';

    const filteredOrders = orders.filter(order => order.status === activeTab);

    if (filteredOrders.length === 0) {
    orderList.innerHTML = `<p>No ${activeTab} orders</p>`;
    return;
}

    filteredOrders.forEach(order => {
    const orderElement = document.createElement('div');
    orderElement.className = 'order-item';
    orderElement.dataset.orderId = order.id;
    if (order.id === selectedOrderId) {
    orderElement.classList.add('selected');
}

    orderElement.innerHTML = `
                <div class="order-details">
                    <h3>Order #${order.id}</h3>
                    <p>Customer: ${order.customerName}</p>
                    <p>Time: ${order.timestamp}</p>
                    <p>Total: ₹${order.total}</p>
                    ${order.items.map(item => `
                        <div class="item-details">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>₹${item.price * item.quantity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-status">
                    <span>Status: ${order.status}</span>
                </div>
            `;

    orderElement.addEventListener('click', () => {
    selectOrder(order.id);
});

    orderList.appendChild(orderElement);
});

    updateActionButtons(); // Update button text based on active tab
}

    // Function to select an order
    function selectOrder(orderId) {
    selectedOrderId = orderId;
    updateOrderList();
}

    // Function to update tab counts
    function updateTabCounts() {
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;

    document.querySelector('.tab:nth-child(1) .count').textContent = pendingCount;
    document.querySelector('.tab:nth-child(2) .count').textContent = readyCount;
}

    // Function to switch between tabs
    function switchTab(e) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');

    activeTab = e.target.textContent.includes('ORDERS') ? 'pending' : 'ready';
    selectedOrderId = null;
    updateOrderList();
}

    // Function to update action button text based on tab
    function updateActionButtons() {
    const confirmBtn = document.querySelector('.confirm');
    const outOfStockBtn = document.querySelector('.out-of-stock');

    if (activeTab === 'pending') {
    confirmBtn.textContent = 'CONFIRM ORDER';
    outOfStockBtn.textContent = 'MARK OUT OF STOCK';
} else { // ready tab
    confirmBtn.textContent = 'DELIVERED';
    outOfStockBtn.textContent = 'REMOVE';
}
}

    // Function to confirm order (pending -> ready) or mark as delivered (ready -> removed)
    function confirmOrder() {
    if (selectedOrderId === null) {
    alert("Please select an order");
    return;
}

    const orderIndex = orders.findIndex(o => o.id === selectedOrderId);
    if (orderIndex === -1) return;

    if (activeTab === 'pending') {
    orders[orderIndex].status = 'ready';
} else if (activeTab === 'ready') {
    orders.splice(orderIndex, 1); // Remove delivered order
}

    selectedOrderId = null;
    updateOrderList();
    updateTabCounts();
}

    // Function to mark out of stock (pending) or remove (ready)
    function markOutOfStock() {
    if (selectedOrderId === null) {
    alert("Please select an order");
    return;
}

    orders = orders.filter(o => o.id !== selectedOrderId);
    selectedOrderId = null;
    updateOrderList();
    updateTabCounts();
}

    // Initialize app when page loads
    document.addEventListener('DOMContentLoaded', initApp);

    // Example usage: Simulating orders from homepage
    setTimeout(() => {
    addOrder({
        customerName: "John Doe",
        items: [
            { name: "Burger", quantity: 2, price: 50 },
            { name: "Fries", quantity: 1, price: 30 }
        ],
        total: 130
    });

    addOrder({
    customerName: "Jane Smith",
    items: [
{ name: "Pizza", quantity: 1, price: 150 }
    ],
    total: 150
});
}, 1000);