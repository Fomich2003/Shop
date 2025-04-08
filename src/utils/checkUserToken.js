async function checkUserToken() {

		let token = localStorage.getItem("token")

		if (token) {
			location.pathname = "/src/pages/profile.html"
		}

}

export default checkUserToken