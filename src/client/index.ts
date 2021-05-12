import { downloadAssets } from "./asset"
import "./css/bootstrap-reboot.css"
import "./css/main.css"
import { connect, login, sendMessage } from "./networking"
Promise.all([connect(), downloadAssets()]).then(() => {
  const nameInput: HTMLInputElement = document.querySelector(".login input")!
  const nameBtn: HTMLButtonElement = document.querySelector(".login .send")!
  nameBtn.addEventListener("click", () => {
    const avatar = `/assets/avatar${Math.floor(Math.random() * 5 + 1)}.jpg`
    console.log(nameInput.value.trim())
    if (nameInput.value.trim() !== "") {
      login(nameInput.value.trim(), avatar)
    } else {
      alert("请输入用户名")
    }
  })

  const input: HTMLInputElement = document.querySelector(".message input")!
  const sendBtn: HTMLElement = document.querySelector(".message .send")!

  sendBtn.addEventListener("click", () => {
    sendMessage(input.value)
    input.value = ""
  })

  input.addEventListener("keydown", e => {
    const { code } = e

    if (code == "Enter") {
      sendMessage(input.value)
      input.value = ""
    }
  })
})
