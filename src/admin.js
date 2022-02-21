const productTableBody = document.querySelector(".admin-products");
const newProductBtn = document.querySelector(".add-new-product");
const productsURL = "https://61e5b1f6c14c7a0017124e05.mockapi.io/First-Project";
window.addEventListener("load", async () => {
  const result = await fetch(productsURL);
  const products = await result.json();
  const productTableBody = document.querySelector(".admin-table");
  const table = products
    .map(
      (product) =>
        `<tr class="items">
          <th scope="row">${product.id}</th>
          <td><img src="${product.img}" class="img-admin"</td>
          <td>${product.title}</td>
          <td>${product.description}</td>
          <td>${product.price} RON</td>
          <td><button data-product-id =${product.id}>Del</button></td>
          <td><button data-product-id =${product.id}>Edit</button></td>
        </tr>`
    )
    .join("");
  productTableBody.innerHTML = table;
});

productTableBody.addEventListener("click", adminButtons);
function adminButtons(event) {
  console.log(event.target);
}
newProductBtn.addEventListener("click", addNewProduct);
async function addNewProduct() {
  let result = await fetch(productsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "test", description: "test", price: "11" }),
  });
  let product = await result.json();
  let newProductRaw = `<tr class="items">
  <th scope="row">${product.id}</th>
  <td><img src="${product.img}" class="img-admin"</td>
  <td>${product.title}</td>
  <td>${product.description}</td>
  <td>${product.price} RON</td>
  <td><button data-product-id =${product.id}>Del</button></td>
  <td><button data-product-id =${product.id}>Edit</button></td>
</tr>`;
  productTableBody.innerHTML += newProductRaw;
}
