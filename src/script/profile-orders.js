import checkToken from "../utils/checkTohen.js";
import { getOrdersByUserId } from "../service/order-service.js";
import cartMenu from "../utils/cart.js";
import burgerMenu from "../utils/burger.js";
import initialLogoutBtn from "../utils/logout.js";
import convertISOToDate from "../utils/convertISOToDate.js";
import { baseImageUrl } from "../utils/constants.js";

cartMenu()
burgerMenu()
initialLogoutBtn()

let profileContentOrders = document.querySelector(".profile_content-orders")

checkToken().then(() => {
    getOrdersByUserId().then(response => {
        if (response.status && response.allOrders.length > 0) {
            response.allOrders.reverse().forEach(order => {
                console.log(order);
                profileContentOrders.innerHTML += `
                    <div class="profile__content-orders">
                        <div class="profile__content-orders__wrapper">
                            <div class="orders__image">
                                ${order.prodsList.map(prod => {
                                    return `<img src="${baseImageUrl + prod.imgs[0]}" alt="${prod.title}">
                                `}).slice(0, 4).join("")}
                            </div>
                            <div class="orders__content">
                                <p>${order.name} ${order.lastname}</p>
                                <p>${order.deliveryAddress}, ${order.delivery}, Відділення: ${order.deliveryWarehouse}</p>
                                <p>${order.phone}</p>
                            </div>
                            <div class="orders__info">
                                <p>Дата замовлення: ${convertISOToDate(order.createdAt)}</p>
                                <p>Статус: ${order.status}</p>
                                <p>Сума: ${order.fullPrice} ₴</p>
                                <button class="show-more-btn">Детальніше</button>
                            </div>
                        </div>
                        <div class="profile__content-orders__list">
                            <h3>Товари в замовленні:</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Фото товару</td>
                                        <td>Назва товару</td>
                                        <td>Ціна товару</td>
                                        <td>Кількість</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${order.prodsList.map(prod => {
                                        return `
                                        <tr>
                                            <td><img src="${baseImageUrl + prod.imgs[0]}" alt="${prod.title}"></td>
                                            <td>${prod.title}</td>
                                            <td>${prod.price} ₴</td>
                                            <td>${prod.counts}</td>
                                        </tr>
                                        `
                                    }).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            })

            let showMoreBtns = document.querySelectorAll(".show-more-btn")
            let profileContentOrdersLists = document.querySelectorAll(".profile__content-orders__list")

            showMoreBtns.forEach((btn, index) => {
                btn.addEventListener("click", () => {
                    profileContentOrdersLists[index].classList.toggle("show")
                })
            })

        } else {
            profileContentOrders.innerHTML = "У вас ще немає замовлень..."
        }
    }).catch(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        location.pathname = "/"
    })
})





