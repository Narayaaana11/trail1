// menu.js

// Profile data (could be fetched from an API or localStorage in a real app)
let profileData = {
    canteenName: "My College Canteen",
    contactNumber: "+91 98765 43210",
    email: "canteen@example.com",
    address: "123 College Road, Campus City"
};

// Menu items array (from your original menu functionality)
let menuItems = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();

    // Page-specific initialization
    if (document.querySelector('.menu-list')) {
        // Menu page
        const addButton = document.querySelector('.add-item');
        addButton.addEventListener('click', showAddItemForm);
        loadMenuItems();
    } else if (document.querySelector('.profile-details')) {
        // Profile page
        loadProfileData();
        setupProfileEditing();
    }
});

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.sidebar li').forEach(li => {
                li.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            // Let the href handle the redirect
        });
    });
}

// --- Menu Page Functions ---
function showAddItemForm() {
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

    const form = document.getElementById('add-item-form');
    form.addEventListener('submit', handleAddItem);

    const cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeForm);
}

function handleAddItem(e) {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemType = document.getElementById('item-type').value;

    const newItem = {
        id: Date.now(),
        name: itemName,
        price: itemPrice,
        type: itemType,
        available: true
    };

    menuItems.push(newItem);
    closeForm();
    displayMenuItems();
}

function closeForm() {
    const overlay = document.querySelector('.form-overlay');
    if (overlay) overlay.remove();
}

function displayMenuItems() {
    const menuList = document.querySelector('.menu-list');
    const existingItems = menuList.querySelectorAll('.menu-item');
    existingItems.forEach(item => item.remove());

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

    document.querySelectorAll('.availability-toggle').forEach(toggle => {
        toggle.addEventListener('change', handleAvailabilityToggle);
    });

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', handleDeleteItem);
    });
}

function handleAvailabilityToggle(e) {
    const itemId = parseInt(e.target.closest('.menu-item').dataset.id);
    const item = menuItems.find(i => i.id === itemId);
    item.available = e.target.checked;
}

function handleDeleteItem(e) {
    const itemId = parseInt(e.target.closest('.menu-item').dataset.id);
    menuItems = menuItems.filter(item => item.id !== itemId);
    displayMenuItems();
}

function loadMenuItems() {
    displayMenuItems();
}

// --- Profile Page Functions ---
function loadProfileData() {
    document.getElementById('canteen-name').textContent = profileData.canteenName;
    document.getElementById('contact-number').textContent = profileData.contactNumber;
    document.getElementById('email').textContent = profileData.email;
    document.getElementById('address').textContent = profileData.address;
}

function setupProfileEditing() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const saveButton = document.querySelector('.save-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const infoItem = this.closest('.info-item');
            const span = infoItem.querySelector('span');
            const currentValue = span.textContent;
            const fieldId = span.id;

            // Replace span with input
            span.innerHTML = `<input type="text" value="${currentValue}" class="edit-input">`;
            this.textContent = 'Save';
            this.classList.remove('edit-btn');
            this.classList.add('save-field-btn');

            // Handle saving individual field
            this.removeEventListener('click', arguments.callee);
            this.addEventListener('click', function() {
                const input = infoItem.querySelector('.edit-input');
                const newValue = input.value.trim();

                if (newValue) {
                    profileData[fieldId.replace('-', '')] = newValue;
                    span.textContent = newValue;
                    this.textContent = 'Edit';
                    this.classList.remove('save-field-btn');
                    this.classList.add('edit-btn');
                    setupProfileEditing(); // Re-attach edit listeners
                }
            });
        });
    });

    saveButton.addEventListener('click', function() {
        const inputs = document.querySelectorAll('.edit-input');
        inputs.forEach(input => {
            const infoItem = input.closest('.info-item');
            const span = infoItem.querySelector('span');
            const fieldId = span.id;
            const newValue = input.value.trim();

            if (newValue) {
                profileData[fieldId.replace('-', '')] = newValue;
                span.textContent = newValue;
            }
        });
        loadProfileData(); // Refresh display
    });
}