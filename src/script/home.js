import burgerMenu from "../utils/burger.js";
import initalProductSlider from "../utils/product-slider.js"
import cartMenu from "../utils/cart.js";

burgerMenu()
cartMenu()
initalProductSlider(".swiper__top-cards .swiper-wrapper", "?discount=true&limit=12")
initalProductSlider(".swiper__top-phones .swiper-wrapper", "?category=Смартфони&limit=8")
initalProductSlider(".swiper__top-tablets .swiper-wrapper", "?category=Планшети&limit=8")