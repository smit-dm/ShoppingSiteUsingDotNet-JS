"use strict";

const emptyCartComponent = () => {
  return `
        <div class="alert alert-primary" role="alert">
            <h4 class="alert-heading">Cart is empty</h4>
            <div class="d-flex">
                <img src="images/icons/info-circle.svg">
                <p class="ms-2 my-0">Go to <a href="index.html">home page</a> and add some products to cart</p>
            </div>
        </div>
    `;
};

const cartListComponent = (items) => {
  console.log(items);
  const cartItems = items.map((item) => {
    const totalItemCost = parseFloat(
      item.product.pricePerUnit * item.quantity
    ).toFixed(2);
    let image = new Image();
    image.src = "data:image/png;base64," + item.product.image;
    return `
      <div class="card mb-3">
          <div class="row g-0">
              <div class="col-md-6">
                  <img src="${image.src}" class="img-fluid rounded-start">
              </div>
              <div class="col-md-6">
                  <div class="card-body">
                      <h5 class="card-title">Product: ${item.product.description}</h5>
                      <p class="card-text mb-0">Price: $${item.product.pricePerUnit}</p>
                      <p class="card-text mb-0">Quantity: ${item.quantity}</p>                                
                      <p class="card-text fw-semibold">Total Cost: $${totalItemCost}</p>
                      <div class="input-group mb-3" style="max-width: 14rem;">
                        <span class="input-group-text">Change Quantity</span>
                        <input onchange="changeQuantity(${item.product.productId})" id="quantity-input-itemid-${item.product.productId}" type="number" min="1" class="form-control" value="${item.quantity}">
                      </div>
                      <button class="btn btn-danger" onclick="removeItem(${item.product.productId})">Remove</button>
                  </div>
              </div>
          </div>
      </div>
    `;
  });
  return cartItems.join("");
};

function changeQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const updatedCart = cart.map((item) => {
    if (item.product.productId === productId) {
      item.quantity = parseInt(
        document.getElementById(`quantity-input-itemid-${productId}`).value
      );
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  loadContent();
}

function removeItem(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const updatedCart = cart.filter((item) => item.product.productId !== productId);
  if (updatedCart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    localStorage.removeItem("cart");
  }
  alert("Item removed from cart");
  loadContent();
}

const totalItemCostComponent = (items) => {
  const totalCost = items.reduce((acc, item) => {
    return acc + item.product.pricePerUnit * item.quantity;
  }, 0);
  return `<p class="fs-2 mb-2" style="margin: 0 auto;">Total Cost: $${totalCost.toFixed(
    2
  )}</p>`;
};

const finalizePurchaseButton = () => {
  return `
    <button class="btn btn-primary" onclick="finalizePurchase()" style="margin: 0 auto;">Finalize Purchase</button>
  `;
};

//get the user
function login_getUser() {
  var user = JSON.parse(localStorage.getItem("user"));
  return user;
}

function finalizePurchase() {
  const user = login_getUser();
  if (user != null) {
    const history = JSON.parse(localStorage.getItem("orderHistory"));
    if (!history) {
      const order = {
        user: user,
        cart: JSON.parse(localStorage.getItem("cart")),
      };
      localStorage.setItem("orderHistory", JSON.stringify([order]));
    } else {
      const order = {
        user: user,
        cart: JSON.parse(localStorage.getItem("cart")),
      };
      history.push(order);
      localStorage.setItem("orderHistory", JSON.stringify(history));
    }
  }
  localStorage.removeItem("cart");
  alert("Thank you for your purchase!");
  loadContent();
}

function loadContent() {
  const content = document.getElementById("content");
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    content.innerHTML = emptyCartComponent();
  } else {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    content.innerHTML = cartListComponent(cartItems);
    content.innerHTML += totalItemCostComponent(cartItems);
    content.innerHTML += finalizePurchaseButton();
  }
}

loadContent();
