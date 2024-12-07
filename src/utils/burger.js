function burgerMenu () {
    let nav = document.querySelector("nav")
    let burger = document.querySelector(".header__burger")
    burger.addEventListener("click", () => {
        burger.classList.toggle("active")
        nav.classList.toggle("active")
    } )
}

export default burgerMenu