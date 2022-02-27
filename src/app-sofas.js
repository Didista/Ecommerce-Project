//function update cart-nav-menu

function updateCartInfo(cart) {
  let info = 0;
  cart.forEach((product) => {
    info = Number(info) + product.numberOfProducts;
  });
  document.querySelector(".cart-count-info").innerHTML = info;
  console.log(info);
}

window.addEventListener("load", async () => {
  const productsURL = "https://61e5b1f6c14c7a0017124e05.mockapi.io/Canapele";
  const result = await fetch(productsURL);
  const products = await result.json();
  const productsContainer = document.querySelector(".products-cards");
  const cards = products
    .map(
      (products) =>
        `<div class="card" style="width: 18rem;">
  <img src="${products.img}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${products.title}</h5>
    <p class="card-text">${products.description}</p> 
    <h7 class="card-price">${products.price} RON </h7>
    <div class="details-addtoCart">
      <a class="btn btn-outline-success" href="details.html?id=${products.id}">Details</a>
      <button data-product-id=${products.id} class=" addProductToCart btn btn-outline-success">Add to cart</button>
    </div>
  </div>
</div>`
    )
    .join("");
  productsContainer.innerHTML = cards;
});

// Add to cart function

document
  .querySelector(".products-cards")
  .addEventListener("click", addProductToCart);
async function addProductToCart(event) {
  const addProductToCartBtn = event.target;
  let productId = addProductToCartBtn.getAttribute("data-product-id");

  const productsURL = "https://61e5b1f6c14c7a0017124e05.mockapi.io/Canapele";
  const result = await fetch(productsURL + "/" + productId);
  const product = await result.json();
  let cart;
  if (localStorage.getItem("cart") == null) {
    cart = [{ ...product, numberOfProducts: 1 }];
    updateCartInfo(cart);
  } else {
    //cart-ul primeste ce era inainte in local storage
    cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.find(
      (productFromCart) => productFromCart.id == product.id
    );
    if (productInCart != undefined) {
      productInCart.numberOfProducts++;
      updateCartInfo(cart);
    } else {
      const selectedProduct = { ...product, numberOfProducts: 1 };
      cart.push(selectedProduct);
      updateCartInfo(cart);
    }
  }
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
