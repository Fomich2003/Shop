import { verifyClient } from "../service/client-service.js"

async function checkToken() {
	try {
		let token = localStorage.getItem("token")
		let loader = document.querySelector(".loader")

		if (!token) {
			return location.pathname = "/src/pages/login.html"
		}

		localStorage.removeItem("user")

		let response = await verifyClient(token)

		loader.style.display = "none"
		localStorage.setItem("user", JSON.stringify(response.user))

		return true
	} catch (error) {
		localStorage.removeItem("token")
		location.pathname = "/src/pages/login.html"
	}
}

export default checkToken