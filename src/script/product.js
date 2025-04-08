import burgerMenu from "../utils/burger.js";
import getProducts from "../service/product-service.js";
import initalProductSlider from "../utils/product-slider.js";
import cartMenu from "../utils/cart.js";
import renderStarRaiting from "../utils/renderStarRaiting.js";
import createProductComment from "../service/comments-service.js";
import convertISOToDate from "../utils/convertISOToDate.js";

burgerMenu()
cartMenu()
initalProductSlider(".swiper__top-cards .swiper-wrapper", "?discount=true&limit=12")

let currProductId = location.search.split("=")[1]
let gallery = document.querySelector(".gallery .swiper-wrapper")
let galleryTrack = document.querySelector(".gallery-track .swiper-wrapper")
let productInfo = document.querySelector(".product__info")
let commentsList = document.querySelector(".comments__list")

getProducts("/" + currProductId)
  .then(data => {
    renderGallery(data.product.imgs, gallery)
    renderGallery(data.product.imgs, galleryTrack)

    var swiperTop = new Swiper(".gallery-track", {
      loop: true,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    var swiperBottom = new Swiper(".gallery", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiperTop,
      },
    });

    let cartFromLs = JSON.parse(localStorage.getItem("cart"))
    let cartList = cartFromLs ? cartFromLs : []
    let prodInCart = cartList.find(el => el._id === data.product._id)

    renderComments(data.product.comments)

    productInfo.innerHTML = `<h3>${data.product.title}</h3>
                               <p>${data.product.descr}</p>

                            <div class="product-card__stars">
                           ${renderStarRaiting(data.product.comments)}
                            </div>
                     <div class="product-card__comments">
                       <img src="/src/icons/comments.svg" alt="C">
                       <span>${data.product.comments.length}</span>
                     </div>
                 <div class="product-card__price">
                 ${data.product.discount ? `<span class="product-card__price-gray">${data.product.price + (data.product.price * data.product.discount / 100)} ₴</span>` : ""}
                 <span class=product-card__price-total>${data.product.price} ₴</span>
                 </div>
                <button class="${prodInCart ? "prod-in-cart" : ""}" id="add-cart-btn" data-id="${data.product._id}">${prodInCart ? "В корзині" : "Купити"}</button>  
`
  })
  .catch(() => {
    location.pathname = "/"
  })

productInfo.addEventListener("click", (event) => {
  if (event.target.closest("#add-cart-btn")) {
    let currProductId = event.target.dataset.id

    let cartFromLs = JSON.parse(localStorage.getItem("cart"))
    let cartList = cartFromLs ? cartFromLs : []

    getProducts("/" + currProductId).then(data => {
      if (data.status) {
        let exProduct = data.product

        let isProductCart = cartList.find(prod => prod._id === exProduct._id)

        if (isProductCart) {
          cartList = cartList.map(prod => {
            if (prod._id === exProduct._id) {
              return { ...prod, counts: prod.counts + 1 }
            } else {
              return prod
            }
          })
        } else {
          cartList.push({ ...exProduct, counts: 1 })
        }

        event.target.innerHTML = "В корзині"
        event.target.classList.add("prod-in-cart")

        localStorage.setItem("cart", JSON.stringify(cartList))
      } else {
        location.reload()
      }
    }).catch(() => location.reload())
  }
})

function renderGallery(imgs, slider) {
  slider.innerHTML = ""

  imgs.forEach(img => {
    slider.innerHTML += `<div class="swiper-slide">
                  <img src="${img}" alt="product image"/>
                </div>`
  });
}




// COMMENTS
let commentFormWrapper = document.querySelector(".comments__form")
let commentForm = document.querySelector(".comments__form form")
let commentTextArea = document.querySelector(".comments__form textarea")
let commentScoreLabel = document.querySelector(".comments__form label")
let commentScoreRange = document.querySelector(".comments__form input")
let commentCreateBtn = document.querySelector(".comments__heading button")

let isUserAuth = localStorage.getItem("token")

if (!isUserAuth) commentCreateBtn.style.display = "none"

commentScoreRange.addEventListener("input", calcRange)

commentForm.addEventListener("submit", (event) => {
  event.preventDefault()

  let newComment = {
    productId: currProductId,
    rate: +commentScoreRange.value,
    text: commentTextArea.value
  }

  createProductComment(newComment).then(() => {
    location.reload()
  }).catch(() => {
    alert("Ви маєте бути авторизовані!")
  })
})

commentCreateBtn.addEventListener("click", () => {
  commentFormWrapper.classList.toggle("active")
  commentCreateBtn.classList.toggle("active")
})

function calcRange() {
  // Обчислюємо позицію як відсоток від загального діапазону
  const percent = (commentScoreRange.value - commentScoreRange.min) /
    (commentScoreRange.max - commentScoreRange.min) * 100;
  // Встановлюємо позицію лейбла
  commentScoreLabel.style.left = `calc(${percent}%`;
  // Оновлюємо текст лейбла
  commentScoreLabel.textContent = commentScoreRange.value;
}

function renderComments(productComments) {
  commentsList.innerHTML = "";
  [...productComments].reverse().forEach(cmm => {
    commentsList.innerHTML += `
                <div class="comments-card">
              <div class="comments-card__author">
                <p>${cmm.author.name + " " + cmm.author.lastname}</p>
                <figure>
                  ${cmm.rate}
                </figure>
              </div>
              <p class="comments-card__text">
                  ${cmm.text}
              </p>
              <p class="comments-card__date">${convertISOToDate(cmm.createdAt)}</p>
            </div>`

  })
} 
//

calcRange()
