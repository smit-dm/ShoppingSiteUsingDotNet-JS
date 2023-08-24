"use strict";

var productCatalog;

const productCard = (product) => {
  let image = new Image();
  image.src = "data:image/png;base64," + product.image;
  return `
        <div class="card w-25 mx-4 mb-3">
          <img
            src="${image.src}"
            class="card-img-top img-fluid"
            style="max-height: 18rem"
          />
          <div class="card-body d-flex flex-column">
            <div class="flex-grow-1">
              <h1 class="card-title">${product.description}</h1>
              <h6 class="card-subtitle mb-2 text-muted">Cost: $${product.pricePerUnit}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Shipping Cost: $${product.shippingCost}</h6>
            </div>
            <a href="comments.html?id=${product.productId}">Comments</a>
            <div class="row mt-2">
              <div class="col-8">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Quantity"
                    aria-label="Quantity"
                    id="productId_${product.productId}_quantity"
                    min="0"
                  />
                </div>
              </div>
              <div class="col">
                <button class="btn btn-primary" onclick="addProductToCart(${product.productId})">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>  
  `;
};

function getProducts() {
  const domain = document.location;
  const apiUrl = `https://${domain}api/products`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

getProducts().then((products) => {
  if (products.length > 0) {
    productCatalog = products;
    // create cards for each product
    const productCards = products.map((product) => productCard(product));
    // add cards to the page
    const productCardsContainer = document.getElementById("productCards");
    productCardsContainer.innerHTML = productCards.join("");
  } else {
    console.log("No products found (this shouldn't happen)");
  }
});

function addProductToCart(productId) {
  const itemQuantityElement = document.getElementById(
    `productId_${productId}_quantity`
  );
  const itemQuantity = parseInt(
    itemQuantityElement?.value ? itemQuantityElement.value : 0
  );
  if (itemQuantity > 0) {
    const product = productCatalog.find((p) => p.productId === productId);
    const cartItem = {
      quantity: itemQuantity,
      product: product,
    };
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartItems = JSON.parse(cart);
      const existingCartItem = cartItems.find(
        (ci) => ci.product.productId === productId
      );
      if (existingCartItem) {
        existingCartItem.quantity += itemQuantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      localStorage.setItem("cart", JSON.stringify([cartItem]));
    }
    alert(`Added ${itemQuantity} ${product.description} to your cart!`);
    itemQuantityElement.value = null;
  } else {
    alert("Please enter a valid quantity");
  }
}
