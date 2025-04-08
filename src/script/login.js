import { loginClient } from "../service/client-service.js"
import cartMenu from "../utils/cart.js";
import burgerMenu from "../utils/burger.js";
import checkUserToken from "../utils/checkUserToken.js";

cartMenu()
burgerMenu()
checkUserToken()

const form = document.querySelector(".auth form")
const allInputs = document.querySelectorAll(".auth input")
const formMessage = document.querySelector(".form-message")

form.addEventListener("submit", (event) => {
	event.preventDefault()

	let client = {
		email: allInputs[0].value,
		password: allInputs[1].value,
	}

	loginClient(client).then(response => {
		if (response.user && response.token) {
			localStorage.setItem("token", response.token)
			localStorage.setItem("user", JSON.stringify(response.user))
			location.pathname = "/src/pages/profile.html"
		} else {
			throw new Error("Some went wrong...")
		}
	}).catch(error => {
		formMessage.style.display = "block"
		formMessage.innerHTML = error.message
		setTimeout(() => {
			formMessage.style.display = "none"
		}, 5000)
	})
})




