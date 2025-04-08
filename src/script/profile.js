import checkToken from "../utils/checkTohen.js";
import cartMenu from "../utils/cart.js";
import burgerMenu from "../utils/burger.js";
import initialLogoutBtn from "../utils/logout.js";


cartMenu()
burgerMenu()
initialLogoutBtn()

let profileContent = document.querySelector(".profile__content")

checkToken().then(() => {
	let user = JSON.parse(localStorage.getItem("user"))

	console.log(user);

	if (user) {
		profileContent.innerHTML = `
								<h2>${user.name} ${user.lastname}</h2>
								<p>Email: ${user.email}</p>
								<p>Phone number: ${user.phone}</p>
								<p>Login: ${user.login}</p>
								<p>Date of register: ${user.createdAt.slice(0, 10)}</p>
			`
	}
})


