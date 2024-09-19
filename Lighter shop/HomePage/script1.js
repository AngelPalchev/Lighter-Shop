let covers = document.getElementsByClassName('small');
let currentImage = document.getElementsByClassName('active');
let count = 0;

let btnBuy = document.getElementById('btn');
let circleContainer = document.getElementById('circleContainer');

function addToCart() {
    // Apply scale animation to the button
    btnBuy.style.transform = 'scale(0.97)';

    // Get product details from data attributes
    let productId = btnBuy.getAttribute('data-product-id');
    let productName = btnBuy.getAttribute('data-product-name');
    let productPrice = btnBuy.getAttribute('data-product-price');
    let productImage = btnBuy.getAttribute('data-product-image');

    // Retrieve cart from local storage or create a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    let existingProduct = cart.find(product => product.id === productId);

    if (existingProduct) {
        // If the product is already in the cart, show a message
        alert("This product is already in your cart.");
    } else {
        // If the product is not in the cart, add it as a new item
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });

        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Increment the cart count indicator
        count++;
        let circle = document.querySelector('.circle');
        if (!circle) {
            // Create the circle element if it doesn't exist
            circle = document.createElement('div');
            circle.className = 'circle';
            circle.textContent = count;
            circleContainer.appendChild(circle);
        } else {
            // Update the number inside the circle
            circle.textContent = count;
        }
    }
}

function buyButton() {
    // Handle button animation
    btnBuy.style.transform = 'scale(0.95)';
    btnBuy.style.backgroundColor = "rgba(179, 89, 43, 0.8)";
    setTimeout(function() {
        btnBuy.style.transform = 'scale(1)';
    }, 100);
    setTimeout(function() {
        btnBuy.style.backgroundColor = "rgba(196, 96, 54, 0.584)";
    }, 150);

    // Call addToCart to handle cart logic
    addToCart();
}

// Bind the event listener correctly
btnBuy.addEventListener('click', buyButton);

// Handle image click functionality
for (var i = 0; i < covers.length; i++) {
    covers[i].addEventListener('click', function() {
        if (currentImage.length > 0) {
            currentImage[0].classList.remove('active');
        }
        this.classList.add('active');
        document.getElementById('currentImage').src = this.src;
    });
}
function navigateToCart() {
    window.location.href = 'cartPage.html';
}