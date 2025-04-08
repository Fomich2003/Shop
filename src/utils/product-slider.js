import getProducts from "../service/product-service.js";
import renderProductCards from "./renderProductCards.js";

function initalProductSlider(className, params) {
	const swiperSlider = document.querySelector(className)

	getProducts(params)
		.then(data => {
			renderProductCards(swiperSlider, data, true)
		})
		.catch(error => {
			alert(error)
		})
		
}

export default initalProductSlider