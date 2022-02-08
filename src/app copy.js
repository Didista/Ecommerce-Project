window.addEventListener("load", async () => {
  const productsURL =
    "https://61e5b1f6c14c7a0017124e05.mockapi.io/First-Project";
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
    <a class="btn btn-outline-success" href="details.html?id=${products.id}">Details</a>
  </div>
</div>`
    )
    .join("");
  productsContainer.innerHTML = cards;
});

// Filter
