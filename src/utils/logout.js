function initialLogoutBtn () {
let logoutBtn = document.querySelector(".logout-btn")
logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token")
        localStorage.removeItem("user")
        location.pathname = "/"
})
}

export default initialLogoutBtn