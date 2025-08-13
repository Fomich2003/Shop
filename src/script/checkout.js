import { sendOrder } from "../service/order-service.js";
import burgerMenu from "../utils/burger.js";
import { baseImageUrl } from "../utils/constants.js";

burgerMenu()

let checkoutList = document.querySelector(".checkout__box-list")
let totalPrice = document.querySelector(".total-price__span")

// Отримати товари з лакльного сховища

let cartList = JSON.parse(localStorage.getItem("cart")) || [];

let fullPriceCounted = cartList.reduce((acc, el) => acc + el.price * el.counts, 0)

totalPrice.innerHTML = fullPriceCounted + " ₴";


// Якщо товарів немає в корзині то переадресація на головну сторінку

if (cartList.length === 0) {
	location.pathname = "/"
}

// Якщо товари є то виводимо їх в checkoutList

function renderCheckout() {
	checkoutList.innerHTML = ""

	cartList.forEach(prod => {
		checkoutList.innerHTML += `
    	<div class="checkout-item">
								<img src="${baseImageUrl + prod.imgs[0]}" alt="">
                                   <div class="checkout-item__wrapper">
								<h3>${prod.title}</h3>
								<p>${prod.descr}</p>
								<span>${prod.counts}шт</span>
								<span>${prod.price * prod.counts} ₴</span>
								   </div>
							</div>
			
								<span></span>					
						        
        `
	});
}

renderCheckout()

// Отримати форму

const form = document.querySelector(".checkout form")
const allInps = document.querySelectorAll(".checkout form input")
const select = document.querySelector(".checkout form select")

form.addEventListener("submit", (event) => {
	event.preventDefault()

	const newOrder = {
		name: allInps[4].value,
		lastname: allInps[3].value,
		email: allInps[5].value,
		phone: allInps[2].value,
		delivery: select.value,
		deliveryAddress: allInps[0].value,
		deliveryWarehouse: allInps[1].value,
		prodsList: cartList,
		fullPrice: fullPriceCounted
	}

	sendOrder(newOrder).then(response => {
		if (response.status) {
			alert("Ваше замовлення успішно прийнято!")
			localStorage.removeItem("cart")
			location.pathname = "/"
		}
	})
})
