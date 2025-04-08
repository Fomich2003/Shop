import { registerClient } from "../service/client-service.js"
import cartMenu from "../utils/cart.js";
import burgerMenu from "../utils/burger.js";
import checkUserToken from "../utils/checkUserToken.js";

cartMenu()
burgerMenu()
checkUserToken()

const form = document.querySelector(".auth form")
const allInputs = document.querySelectorAll(".auth input")
const formMessage = document.querySelector(".form-message")
let formCanSend = false
allInputs[6].addEventListener("input", () => {
	if (allInputs[6].value !== allInputs[5].value) {
		formCanSend = false
		allInputs[6].style.border = "1px solid red"
	} else {
		formCanSend = true
		allInputs[6].style.border = "1px solid black"
	}
})

form.addEventListener("submit", (event) => {
	event.preventDefault()

	if (!formCanSend) return

	let newClient = {
		name: allInputs[0].value,
		lastname: allInputs[1].value,
		phone: allInputs[2].value,
		email: allInputs[3].value,
		login: allInputs[4].value,
		password: allInputs[5].value,
	}

	registerClient(newClient).then(response => {
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