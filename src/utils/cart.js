import { baseImageUrl } from "./constants.js";

function cartMenu() {
  const cart = document.querySelector(".cart");
  const closeButton = document.querySelector(".cart-close");
  const openButtons = document.querySelectorAll("#open-cart");
  const body = document.body;
  const cartListSelector = document.querySelector(".cart-list");
  const cartBottom = document.querySelector(".cart-bottom");
  const cartFullPrice = document.querySelector(".cart-full__price");
  const orderCartBtn = document.querySelector(".order-cart-btn")

  orderCartBtn.addEventListener("click", () => {
    location.pathname = "/src/pages/checkout.html"
  })

  if (!cart || !closeButton || !cartListSelector || !cartBottom || !cartFullPrice) {
    console.error("Не знайдено необхідні елементи");
    return;
  }

  let cartList = [];

  cart.addEventListener("click", (event) => {
    if (event.target.classList.contains("cart") && cart.classList.contains("active")) {
      closeCart();
    }
  });

  openButtons.forEach((button) => button.addEventListener("click", openCart));
  closeButton.addEventListener("click", closeCart);

  cartListSelector.addEventListener("click", (event) => {
    const et = event.target;
    const prodId = et.dataset.id;

    if (et.closest(".cart-btn-minus")) {
      const findedIndex = cartList.findIndex((el) => el._id === prodId);

      if (findedIndex >= 0) {
        if (cartList[findedIndex].counts <= 1) return;
        cartList[findedIndex].counts -= 1;
        localStorage.setItem("cart", JSON.stringify(cartList));
        renderCart(cartListSelector, cartList, cartBottom, cartFullPrice);
      }
    }

    if (et.closest(".cart-btn-plus")) {
      const findedIndex = cartList.findIndex((el) => el._id === prodId);

      if (findedIndex >= 0) {
        if (cartList[findedIndex].counts >= 99) return;
        cartList[findedIndex].counts += 1;
        localStorage.setItem("cart", JSON.stringify(cartList));
        renderCart(cartListSelector, cartList, cartBottom, cartFullPrice);
      }
    }

    if (et.closest(".cart-btn-delete")) {
      cartList = cartList.filter((el) => el._id !== prodId);
      localStorage.setItem("cart", JSON.stringify(cartList));
      renderCart(cartListSelector, cartList, cartBottom, cartFullPrice);
    }
  });

  function openCart() {
    cartList = JSON.parse(localStorage.getItem("cart")) || [];
    renderCart(cartListSelector, cartList, cartBottom, cartFullPrice);
    body.classList.add("fixed");
    cart.classList.add("active");
  }

  function closeCart() {
    body.classList.remove("fixed");
    cart.classList.remove("active");
  }
}

function renderCart(selector, cartList, cartBottom, cartFullPrice) {
  selector.innerHTML = "";

  if (cartList.length === 0) {
    cartBottom.style.display = "none";
  } else {
    cartBottom.style.display = "flex";
    cartFullPrice.innerHTML =
      cartList.reduce((acc, el) => acc + el.price * el.counts, 0) + "₴";
  }

  cartList.forEach((prod) => {
    selector.innerHTML += `
      <div class="cart-item">
        <img src="${baseImageUrl + prod.imgs[0]}" alt="">
        <div class="cart-item__wrapper">
          <h3>${prod.title}</h3>
          <span class="cart-item__price">${prod.price * prod.counts}</span>
          <div class="cart-item__counts">
            <button class="cart-btn-minus" data-id="${prod._id}">-</button>
            <span class="cart-item__count">${prod.counts}</span>
            <button class="cart-btn-plus" data-id="${prod._id}">+</button>
          </div>
          <button class="cart-btn-delete" data-id="${prod._id}">Видалити</button>
        </div>
      </div>
    `;
  });
}


export default cartMenu;