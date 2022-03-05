const productTableBody = document.querySelector(".admin-products");
const newProductBtn = document.querySelector(".add-new-product");
const updateProductBtn = document.querySelector(".update-product");
const productsURL = "https://61e5b1f6c14c7a0017124e05.mockapi.io/First-Project";
window.addEventListener("load", getAllAdminProducts);
async function getAllAdminProducts() {
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
          <td><button class="deleteAdmin  btn adminButton" data-product-id =${product.id}>␡</button></td>
          <td><button class="editAdmin  btn adminButton" data-product-id =${product.id}> ✏</button></td>
        </tr>`
    )
    .join("");
  productTableBody.innerHTML = table;
}

productTableBody.addEventListener("click", adminButtons);

// Delete/edit button

async function adminButtons(event) {
  const productId = event.target.getAttribute("data-product-id");
  if (event.target.classList.contains("deleteAdmin")) {
    console.log("test", productId);
    let result = await fetch(`${productsURL}/${productId}`, {
      method: "DELETE",
    });
    console.log("delete", result);
    getAllAdminProducts();
  } else if (event.target.classList.contains("editAdmin")) {
    console.log("edit", productId);
    editAdminProductById(productId);
  }
}

newProductBtn.addEventListener("click", addNewProduct);
async function addNewProduct(event) {
  event.preventDefault();
  const newImage = document.getElementById("image").value;
  const newTitle = document.getElementById("title").value;
  const newDescription = document.getElementById("description").value;
  const newPrice = document.getElementById("price").value;

  let result = await fetch(productsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      img: newImage,
      title: newTitle,
      description: newDescription,
      price: newPrice,
    }),
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

// Imi da imputul pe care sa il editez
updateProductBtn.addEventListener("click", updateProduct);
async function updateProduct(event) {
  event.preventDefault();
  const productImage = document.getElementById("image").value;
  const productTitle = document.getElementById("title").value;
  const productDescription = document.getElementById("description").value;
  const productPrice = document.getElementById("price").value;
  const productId = document.getElementById("productId").value;

  let result = await fetch(`${productsURL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: productId,
      img: productImage,
      title: productTitle,
      description: productDescription,
      price: productPrice,
    }),
  });
  let data = await result.json();
  console.log(data);
  getAllAdminProducts();
}

async function editAdminProductById(productId) {
  const productImage = document.getElementById("image");
  const productTitle = document.getElementById("title");
  const productDescription = document.getElementById("description");
  const productPrice = document.getElementById("price");
  const productIDHidden = document.getElementById("productId");
  let result = await fetch(`${productsURL}/${productId}`);
  let product = await result.json();
  productImage.value = product.img;
  productTitle.value = product.title;
  productDescription.value = product.description;
  productPrice.value = product.price;
  productIDHidden.value = product.id;
}
