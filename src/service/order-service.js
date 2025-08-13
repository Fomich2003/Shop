const BASE_URL = 'https://backend-shop-9t4u.onrender.com/orders'

async function sendOrder(order) {
    try {
        let result = await fetch(BASE_URL + "/new-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
        if (!result.ok) throw new Error("Ой! Щось пішло не так...\nСпробуй пізніше")

        let data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

async function getOrdersByUserId() {
    try {

        let token = localStorage.getItem("token")

        if (!token) throw new Error("Token undefined")

        let result = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (!result.ok) throw new Error("ОЙ! Щось пішло не так... /nСпробуй пізніше")

        let data = await result.json()
        return data
    } catch (error) {
        throw error
    }
}

export { sendOrder, getOrdersByUserId }