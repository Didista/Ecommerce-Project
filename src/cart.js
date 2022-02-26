//function update cart-nav-menu

function updateCartInfo(cart) {
  let info = 0;
  cart.forEach((product) => {
    info = info + product.numberOfProducts;
  });
  document.querySelector(".cart-count-info").innerHTML = info;
}

window.addEventListener("load", () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  //Total price

  const delivery = 50;
  let total = 0;

  if (cart) {
    cart.forEach((product) => {
      total = total + Number(product.price) * product.numberOfProducts;
      console.log(product.price);
    });
  }
  let pricePlusDelivery = 0;
  pricePlusDelivery = pricePlusDelivery + total + delivery;
  const productCards = cart
    .map(
      (product) =>
        `<div class=" box" style="max-width: 700px;" >
      <div class="product-cart-container">
        <div class="cart-img">
          <img src="${product.img}" class=" img img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-price">${product.price} RON</p>
          </div>
          <div class="card-nr-of-products">
            <p class="card-text-number-products"> Aveti in cos: </p>
            <p class="card-price">
              <button type="button" data-product-id=${product.id} class=" decrement btn btn-outline-secondary">-</button>
                <span class="number-of-products">${product.numberOfProducts}</span>
              <button type="button" data-product-id=${product.id} class=" increment  btn btn-outline-secondary">+</button>
            </p>
          </div>
        </div>
      </div>
      <button type="button" data-product-id=${product.id} class="delete btn btn-outline-success"><i class="fa fa-trash"></i></button>
    </div>`
    )
    .join("");

  let totalPrice = `<div class="a" >
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Total produse (cu TVA): ${total} RON</li>
    <li class="list-group-item">Cost livrare: ${delivery} RON</li>
    <li class="list-group-item price-delivery card-price">Pret Total : ${pricePlusDelivery} RON</li>
  </ul>
  </div>`;
  document.querySelector(".cart-container").innerHTML = productCards;
  document.querySelector(".total-price-container").innerHTML = totalPrice;
  updateCartInfo(cart);
});

// Make an event for - + and delete buttons

const cartContainer = document.querySelector(".cart-container");
cartContainer.addEventListener("click", cartButtons);
function cartButtons(event) {
  const targetButton = event.target;
  let cart = JSON.parse(localStorage.getItem("cart"));
  const productInCart = cart.find(
    (productFromCart) =>
      productFromCart.id == targetButton.getAttribute("data-product-id")
  );
  let quantityParagraf = targetButton.parentNode;

  //Increase qty

  if (targetButton.classList.contains("increment")) {
    productInCart.numberOfProducts++;
    updateCartInfo(cart);
  }

  //Decrese qty
  else if (targetButton.classList.contains("decrement")) {
    if (productInCart.numberOfProducts > 1) {
      productInCart.numberOfProducts--;
      updateCartInfo(cart);
    }
  }

  //Delete qty
  else if (targetButton.classList.contains("delete")) {
    productInCart.numberOfProducts = 0;

    // To have in cart different products only

    cart = cart.filter((product) => product.id != productInCart.id);
    targetButton.parentNode.remove();
    updateCartInfo(cart);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (productInCart) {
    quantityParagraf.querySelector(".number-of-products").innerHTML =
      productInCart.numberOfProducts;
    let pricePlusDelivery = 0;
    let total = 0;
    const delivery = 50;

    // Multiply price by qty

    cart.forEach((product) => {
      total = total + Number(product.price) * product.numberOfProducts;
      console.log(product.price);
    });

    pricePlusDelivery = pricePlusDelivery + total + delivery;
    let totalPrice = `<div class= "a">
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Total produse (cu TVA): ${total} RON</li>
    <li class="list-group-item">Cost livrare: ${delivery} RON</li>
    <li class="list-group-item price-delivery card-price">Pret Total : ${pricePlusDelivery} RON</li>
  </ul>
  </div>`;
    document.querySelector(".total-price-container").innerHTML = totalPrice;
  }

  // Remove Total - Add "Cosul este gol"

  if (cart.length == 0) {
    localStorage.removeItem("cart", JSON.stringify(cart));
    let bannerHidden = document.querySelector(".hidden");
    let removeTotal = document.querySelector(".total-price-container");
    removeTotal.classList.add("hidden");
    bannerHidden.classList.remove("hidden");
  }
}
