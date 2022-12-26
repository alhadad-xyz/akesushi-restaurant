document.addEventListener("DOMContentLoaded", () => {
  allProduct();
  cartList();
  updateCart();
});

function allProduct() {
  fetch("https://akesushi-admin.up.railway.app/v1/products")
    .then((response) => response.json())
    .then((data) => renderProduct(data));
}

function renderProduct(products) {
  let container = document.getElementById("popular-container");

  products.forEach((product) => {
    let id = product._id;
    let name = product.name;
    let description = product.subtitle;
    let price = product.price;
    let image = product.image;

    container.innerHTML += `
      <article class="popular__card">
        <img src="${image}" alt="popular image" class="popular__img">
    
        <h3 class="popular__name">${name}</h3>
        <span class="popular__description">${description}</span>
        <span class="popular__price">${priceFormat(price)}</span>
        <button class="popular__button" onclick="addToCart('${encodeURIComponent(
          JSON.stringify(product)
        )}')">
            <i class="ri-shopping-bag-line"></i>
        </button>
      </article>
    `;
  });
}

// CART
let count = 0;
let sum = 0;
let myCart = {};
let cartContainer = document.getElementById("cart-container");

if (localStorage.getItem("count")) {
  count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
  sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("myCart")) {
  myCart = JSON.parse(localStorage.getItem("myCart"));
}

function cartList() {
  if(Object.keys(myCart).length != 0) {
    for (let id in myCart) {
      let item = myCart[id];
      
      cartContainer.innerHTML += `
        <article class="cart__card">
          <div class="cart__box">
              <img src="${item.image}" alt="" class="cart__img">
          </div>
    
          <div class="cart__details">
              <h3 class="cart__title">${item.name}</h3>
              <span class="cart__price">${priceFormat(item.price * item.qty)}</span>
    
              <div class="cart__amount">
                  <div class="cart__amount-content">
                      <span class="cart__amount-box">
                          <i class="ri-subtract-line" onclick="minCart('${id}')"></i>
                      </span>
    
                      <span class="cart__amount-number">${item.qty}</span>
    
                      <span class="cart__amount-box" onclick="plusCart('${id}')">
                          <i class="ri-add-line"></i>
                      </span>
                  </div>
    
                  <i class="ri-delete-bin-line cart__amount-trash" onclick="removeCart('${id}')"></i>
              </div>
          </div>
        </article>
      `
    }
  }
}

function addToCart(product) {
  product = JSON.parse(decodeURIComponent(product));

  let id = product._id;
  let name = product.name;
  let price = product.price;
  let subtitle = product.subtitle;
  let image = product.image;

  if (id in myCart) {
    myCart[id].qty++;
  } else {
    let cartItem = {
      name: name,
      subtitle: subtitle,
      price: price,
      image: image,
      qty: 1,
    };

    myCart[id] = cartItem;
  }

  count++;
  sum += price;

  cartContainer.innerHTML = ""
  updateCart();
  cartList();
}

function plusCart(id) {
  if (id in myCart) {
    myCart[id].qty++;
    count++;
    sum += myCart[id].price;
    
    cartContainer.innerHTML = ""
    updateCart();
    cartList()
  }
}

function minCart(id) {
  if (id in myCart) {
    if(myCart[id].qty > 1) {
      myCart[id].qty--;
      count--;
      sum -= myCart[id].price;
      
      cartContainer.innerHTML = ""
      updateCart();
      cartList()
    }
  }
}

function removeCart(id, total) {
  if (id in myCart) {
    if(myCart[id].qty > 0) {
      count -= myCart[id].qty;
      sum -= (myCart[id].qty * myCart[id].price);
      delete myCart[id]
      
      cartContainer.innerHTML = ""
      updateCart();
      cartList()
    }
  }
}

function updateCart() {
  document.getElementById("sum").textContent = priceFormat(sum);
  document.getElementById("count").textContent = count + ' items';
  localStorage.setItem("sum", sum);
  localStorage.setItem("count", count);
  localStorage.setItem("myCart", JSON.stringify(myCart));
}

function checkout() {
  if(Object.keys(myCart).length != 0) {
    window.location.href = '/checkout.html';
  } else {
    alert('Your cart is empty, please get some item please!')
  }
}
