const BASE_URL = 'http://localhost:5000/clients'

async function registerClient(newClient) {
	try {
		let result = await fetch(BASE_URL + "/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newClient)
		})

		let data = await result.json()

		if (!result.ok) throw new Error(data.message)

		return data
	} catch (error) {
		throw error
	}
}

async function loginClient(client) {
	try {
		let result = await fetch(BASE_URL + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(client)
		})

		let data = await result.json()

		if (!result.ok) throw new Error(data.message)

		return data
	} catch (error) {
		throw error
	}
}

async function verifyClient(token) {
	try {
		let result = await fetch(BASE_URL + "/verif", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		})

		let data = await result.json()

		if (!result.ok) throw new Error(data.message)

		return data
	} catch (error) {
		throw error
	}
}

export { registerClient, loginClient, verifyClient }