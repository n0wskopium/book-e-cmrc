document.addEventListener('DOMContentLoaded', function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.innerText = cart.length;
    }
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(bookCard) {
    const titleElement = bookCard.querySelector('.book-title');
    const authorElement = bookCard.querySelector('.book-author');
    const coverElement = bookCard.querySelector('.book-cover');
    const priceElement = bookCard.querySelector('.book-price');

    const book = {
        title: titleElement?.innerText || 'Unknown Title',
        author: authorElement?.innerText || 'Unknown Author',
        cover: coverElement?.src || '',
        price: parseFloat(priceElement?.innerText.replace('$', '')) || 0 // Extract price
    };

    cart.push(book);
    saveCart();
    updateCartCount();
    alert(`Added "${book.title}" to your cart!`);
}

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart')) {
        event.preventDefault();
        const bookCard = event.target.closest('.book-card');
        if (bookCard) {
            addToCart(bookCard);
        }
    }
});

  updateCartCount();

  // CART PAGE FUNCTIONALITY
  if (document.body.classList.contains('cart-page')) {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    function displayCartItems() {
      cartItemsContainer.innerHTML = '';
      let total = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.innerText = '$0.00';
        return;
      }

      cart.forEach((book, index) => {
        const bookPrice = 10;
        total += bookPrice;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${book.cover}" alt="${book.title}" class="cart-item-cover">
          <div class="cart-item-info">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>Price: $${bookPrice.toFixed(2)}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      cartTotalElement.innerText = `$${total.toFixed(2)}`;

      document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function () {
          const index = this.getAttribute('data-index');
          cart.splice(index, 1);
          saveCart();
          displayCartItems();
          updateCartCount();
        });
      });
    }

    displayCartItems();

    checkoutButton.addEventListener('click', function () {
      if (cart.length === 0) {
        alert("Your cart is empty. Add items before checkout.");
        return;
      }
      window.location.href = 'checkout.html';
    });
  }
});
