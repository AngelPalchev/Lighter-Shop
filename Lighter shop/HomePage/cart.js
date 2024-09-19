let productTotal = 0;
let cartTotal = 0;
const fp = document.getElementById("fp");
fp.style.display = "none";
let map;

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; 
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <span>${product.name}</span>
            <span1>$${product.price}</span1>
            <input type="number" value="${product.quantity}" min="1" data-product-id="${product.id}">
        `;

        let productTotal = product.price * product.quantity;
        cartTotal += productTotal;
        cartContainer.appendChild(cartItem);
        fp.style.display = "block";
        fp.innerHTML = "Total Price:" + " " + "$" + cartTotal;
    });
}
let checkOutBtn = document.getElementById('ChkOut');

checkOutBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let currentDateTime = new Date().toLocaleString();

    let fName = document.getElementById('firstName').value;
    let lName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
    let telephone = document.getElementById('phone-number').value;

    let products = JSON.parse(localStorage.getItem('cart')) || [];

    let order = {
        FirstName: fName,
        LastName: lName,
        Address: address,
        Email: email,
        PhoneNumber: telephone,
        OrderTime: currentDateTime,
        Products: products 
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Your order has been saved!");
    document.getElementById('myForm').reset();
})


displayCart();