window.addEventListener("load", () => {
  const products = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  if (products) {
    products.forEach((product) => {
      total = total + Number(product.price);
    });
  }
  const productCards = products
    .map(
      (product) =>
        `<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${product.img}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-price">${product.price} RON</p>
        </div>
        <div class="number-of-products">
        <p class="card-text-number-products"> Aveti in cos: </p>
        <p class="card-price">
        <button type="button" class="btn btn-outline-secondary">+</button>
        ${product.numberOfProducts} buc 
        <button type="button" class="btn btn-outline-secondary">-</button>
        </p>
        </div>
      </div>
    </div>
  </div>`
    )
    .join("");
  // TO DO!!!!
  // let totalPrice = `<div class="total-price-cart">
  // <h1>Total produse (cu TVA): </h1>
  // <h2> ${total} RON </h2>
  // </div>`;
  document.querySelector(".cart-container").innerHTML = productCards;
  // productCards + totalPrice;
});

const cartContainer = document.querySelector(".cart-container")