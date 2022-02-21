window.addEventListener("load", async () => {
  let searchParamString = window.location.search;
  const searchParam = new URLSearchParams(searchParamString);
  const productId = searchParam.get("id");

  const productsURL =
    "https://61e5b1f6c14c7a0017124e05.mockapi.io/First-Project";
  const result = await fetch(productsURL + "/" + productId);
  const product = await result.json();
  const productCard = `
    <div class="details">
        <div class="detailCard">
          <div class="col-md-4">
            <img src="${product.img}" class="details-img" alt="...">
          </div>
            <div class="card-body-details">
              <div class="titleDescription">
                <h5 class="card-title">${product.title}</h5>
                <div class="detailed-description">
                  <p class="text">${product.detailedDescription}</p>
                  <p class="text">${product.detailedDescription2}</p>
                  <p class="text">${product.detailedDescription3}</p>
                </div>
                <div class="warranty">
                  <h5 class="card-text">Timpul de livrare al produsului va fi oferit de un operator la confirmarea comenzii!</h5>
                  <h5 class="card-text">GARANTIE: 24 LUNI</h5>
                </div>
              </div>
              <div class="addToCart">
                <p class="card-price">${product.price} RON</small></p>
                <button data-product-id=${product.id} class=" addProductToCart btn btn-outline-success">Add to cart</button>
              </div>
            </div>
        </div>
    </div>`;
  document.querySelector(".product-details").innerHTML = productCard;
});
document
  .querySelector(".product-details")
  .addEventListener("click", addProductToCart);
async function addProductToCart(event) {
  const addProductToCartBtn = event.target;
  let productId = addProductToCartBtn.getAttribute("data-product-id");

  const productsURL =
    "https://61e5b1f6c14c7a0017124e05.mockapi.io/First-Project";
  const result = await fetch(productsURL + "/" + productId);
  const product = await result.json();
  let cart;
  if (localStorage.getItem("cart") == null) {
    cart = [{ ...product, numberOfProducts: 1 }];
  } else {
    //cart-ul primeste ce era inainte in local storage
    cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.find(
      (productFromCart) => productFromCart.id == product.id
    );
    if (productInCart != undefined) productInCart.numberOfProducts++;
    else {
      const selectedProduct = { ...product, numberOfProducts: 1 };
      cart.push(selectedProduct);
    }
  }
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
