// Function to handle search
document.querySelector('.search-bar button').addEventListener('click', async () => {
    const searchQuery = document.querySelector('.search-bar input').value;
    const response = await fetch(`/api/books?q=${searchQuery}`);
    const books = await response.json();
    displayBooks(books);
});

// Function to add a book to the cart
async function addToCart(bookId) {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
    });
    const result = await response.json();
    alert(result.message);
}
function displayBooks(books) {
    const booksGrid = document.querySelector('.books-grid');
    booksGrid.innerHTML = books.map(book => `
        <div class="book">
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>$${book.price.toFixed(2)}</p>
            <button onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `).join('');
}
// Fetch and display cart items
async function fetchCartItems() {
    const response = await fetch('/api/cart');
    const cartItems = await response.json();
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <h3>${item.title}</h3>
            <p>$${item.price.toFixed(2)}</p>
        </div>
    `).join('');
}

// Call this function when the cart page loads
if (window.location.pathname === '/cart.html') {
    fetchCartItems();
}

// Modified fetchCartItems to show total
async function fetchCartItems() {
    const response = await fetch('/api/cart');
    const cartItems = await response.json();
    const cartItemsContainer = document.getElementById('cart-items');
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <h3>${item.title}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Add remove from cart functionality
async function removeFromCart(itemId) {
    const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if (result.success) {
        fetchCartItems(); // Refresh cart
    }
}

// Add checkout handler
function checkout() {
    alert('Checkout functionality coming soon!');
}

// Add these fetch calls at the bottom of script.js
async function loadFeaturedBooks() {
    const response = await fetch('/api/books/featured');
    const books = await response.json();
    displayFeaturedBooks(books);
  }
  
  async function loadBestsellers() {
    const response = await fetch('/api/books/bestsellers');
    const books = await response.json();
    displayBestsellers(books);
  }
  
  // Initial load on homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    loadFeaturedBooks();
    loadBestsellers();
  }