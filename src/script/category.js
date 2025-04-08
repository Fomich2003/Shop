import burgerMenu from "../utils/burger.js";
import getProducts from "../service/product-service.js";
import renderProductCards from "../utils/renderProductCards.js";
import cartMenu from "../utils/cart.js";

let categoryList = document.querySelector(".category__list")
let title = document.querySelector("h1")

burgerMenu()
cartMenu()

getProducts(location.search)
	.then(data => {
		renderProductCards(categoryList, data)
	})
	.catch((error) => {
		alert(error)
	})

function findCategoryText(urlParam) {
	if (!urlParam) return "Каталог"

	let splitedText = urlParam.split("=")

	if (splitedText[0] !== "?category" || !splitedText[1]) return "Каталог"

	return decodeURIComponent(splitedText[1])
}

title.innerHTML = findCategoryText(location.search)
