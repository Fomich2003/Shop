import getProducts from "../service/product-service.js";
import { baseImageUrl } from "./constants.js";
import renderStarRaiting from "./renderStarRaiting.js";

function renderProductCards(wrapper, productList, isSlider = false) {
	wrapper.innerHTML = ""

	let cartFromLs = JSON.parse(localStorage.getItem("cart"))
	let cartList = cartFromLs ? cartFromLs : []

	productList.forEach(prod => {
		let tempCard = document.createElement("div")

		if (isSlider) {
			tempCard.classList.add("swiper-slide")
		} else {
			tempCard.classList.add("catalog-card")
		}

		let prodInCart = cartList.find(el => el._id === prod._id)

		tempCard.innerHTML = `<div class="product-card">
									<div class="product-card__image">
										<a href="/src/pages/product.html?id=${prod._id}">
											<img src="${baseImageUrl + prod.imgs[0]}" alt="Iphone card">	
										</a>
									</div>
                                    
									<div class="product-card__content">
										
										<h3><a href="/src/pages/product.html?id=${prod._id}">${prod.title}</a></h3>
										
										<a href="/src/pages/comment.html?id=${prod._id}" class="product-card__rate">
											<div class="product-card__stars">
                                                      ${renderStarRaiting(prod.comments)}	
											</div>
											<div class="product-card__comments">
												<img src="/src/icons/comments.svg" alt="C">
												${prod.comments.length}
											</div>
										</a>
										<div class="product-card__nav">
											<div class="product-card__price">
												${prod.discount ? `<span class="product-card__price-gray">${prod.price + (prod.price * prod.discount / 100)} ₴</span>` : ""}
												<span class="product-card__price-total">${prod.price} ₴</span>
											</div>
											<button class="${prodInCart ? "prod-in-cart" : ""}" id="add-cart-btn" data-id="${prod._id}">${prodInCart ? "в корзині" : "Купити"}</button>
									   </div>
									</div>
									${prod.discount ? `<div class="product-card__promo">-${prod.discount}%</div>` : ""}
								</div>`
		wrapper.append(tempCard)
	});

	wrapper.addEventListener("click", (event) => {
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

					event.target.innerHTML = "в корзині"
					event.target.classList.add("prod-in-cart")

					localStorage.setItem("cart", JSON.stringify(cartList))
				} else {
					location.reload()
				}
			}).catch(() => location.reload())
		}
	})
}


export default renderProductCards