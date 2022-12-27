/*=============== DARK LIGHT THEME ===============*/
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
}
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

// Formatter Rupiah
const priceFormat = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

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
