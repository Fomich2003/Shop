const BASE_URL = 'https://backend-shop-9t4u.onrender.com/comments'

async function createProductComment(newComment) {
	try {
		let token = localStorage.getItem("token")

		if (!token) throw new Error("Token undefined")

		let result = await fetch(BASE_URL + "/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(newComment)
		})

		if (!result.ok) throw new Error("ОЙ! Щось пішло не так... /nСпробуй пізніше")

		let data = await result.json()
		return data
	} catch (error) {
		throw error
	}
}

export default createProductComment

