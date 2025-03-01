// menu.js

// Function to initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the Add New Item button
    const addButton = document.querySelector('.add-item');
    addButton.addEventListener('click', showAddItemForm);

    // Load existing items (if any)
    loadMenuItems();
});

// Array to store menu items
let menuItems = [];

// Function to show form for adding new item
function showAddItemForm() {
    // Create form overlay
    const formHTML = `
        <div class="form-overlay">
            <div class="form-container">
                <h3>Add New Item</h3>
                <form id="add-item-form">
                    <div class="form-group">
                        <label for="item-name">Item Name:</label>
                        <input type="text" id="item-name" required>
                    </div>
                    <div class="form-group">
                        <label for="item-price">Price (₹):</label>
                        <input type="number" id="item-price" min="0" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>Food Type:</label>
                        <select id="item-type" required>
                            <option value="veg">Vegetarian</option>
                            <option value="non-veg">Non-Vegetarian</option>
                            <option value="egg">Egg</option>
                        </select>
                    </div>
                    <div class="form-buttons">
                        <button type="submit">Add Item</button>
                        <button type="button" class="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHTML);

    // Add event listeners
    const form = document.getElementById('add-item-form');
    form.addEventListener('submit', handleAddItem);

    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeForm);
}

// Function to handle form submission
function handleAddItem(e) {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemType = document.getElementById('item-type').value;

    const newItem = {
        id: Date.now(), // Simple unique ID
        name: itemName,
        price: itemPrice,
        type: itemType,
        available: true
    };

    menuItems.push(newItem);
    closeForm();
    displayMenuItems();
}

// Function to close the form
function closeForm() {
    const overlay = document.querySelector('.form-overlay');
    if (overlay) overlay.remove();
}

// Function to display menu items
function displayMenuItems() {
    const menuList = document.querySelector('.menu-list');

    // Clear existing items (except heading and button)
    const existingItems = menuList.querySelectorAll('.menu-item');
    existingItems.forEach(item => item.remove());

    // Add each item
    menuItems.forEach(item => {
        const itemHTML = `
            <div class="menu-item" data-id="${item.id}">
                <span class="item-name">${item.name}</span>
                <span class="item-type ${item.type}">${item.type === 'veg' ? '🥕' : item.type === 'egg' ? '🥚' : '🍗'}</span>
                <span class="item-price">₹${item.price.toFixed(2)}</span>
                <input type="checkbox" ${item.available ? 'checked' : ''} class="availability-toggle">
                <button class="action-btn delete">Delete</button>
            </div>
        `;
        menuList.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Add event listeners for toggles and delete buttons
    document.querySelectorAll('.availability-toggle').forEach(toggle => {
        toggle.addEventListener('change', handleAvailabilityToggle);
    });

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', handleDeleteItem);
    });
}

// Function to toggle availability
function handleAvailabilityToggle(e) {
    const itemId = parseInt(e.target.closest('.menu-item').dataset.id);
    const item = menuItems.find(i => i.id === itemId);
    item.available = e.target.checked;
}

// Function to delete item
function handleDeleteItem(e) {
    const itemId = parseInt(e.target.closest('.menu-item').dataset.id);
    menuItems = menuItems.filter(item => item.id !== itemId);
    displayMenuItems();
}

// Function to load initial items (could be from localStorage or API)
function loadMenuItems() {
    // For now, we'll start with empty array
    // You could modify this to load from localStorage or an API
    displayMenuItems();
}