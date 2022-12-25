document.addEventListener("DOMContentLoaded", () => {
  itemList();
  document.getElementById("checkout-sum").textContent = priceFormat(sum);
});

let checkoutContainer = document.getElementById("checkout-result");

// Formatter Rupiah
const priceFormat = (number)=>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

function itemList() {
  if(Object.keys(myCart).length != 0) {
    for (let id in myCart) {
      let item = myCart[id];

      checkoutContainer.innerHTML += `
        <div class="checkout__item">
          <label class="checkout__label">${item.name} ${item.qty}x</label>
          <label class="checkout__label">${priceFormat(item.price * item.qty)}</label>
        </div>
      `
    }
  }
}

