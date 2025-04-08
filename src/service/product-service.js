const BASE_URL = 'http://localhost:5000/products'

async function getProducts(param) {
	try {
		let result = await fetch(BASE_URL + param)

		if (!result.ok) throw new Error("Ой! Щось пішло не так...")

		let data = await result.json()
		return data
	} catch (error) {
		throw error
	}
}

export default getProducts