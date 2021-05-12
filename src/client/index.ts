import "./css/bootstrap-reboot.css"
import "./css/main.css"
import { connect, enter, sendMessage } from "./networking"
import { user } from "./state"
new Promise<void>(resolve => {
  connect()
  resolve()
}).then(() => {
  const nameInput: HTMLInputElement = document.querySelector(".name input")!
  const nameBtn: HTMLButtonElement = document.querySelector(".name .send")!
  nameBtn.addEventListener("click", () => {
    enter(nameInput.value)
    document.querySelector(".input_wrapper.message")?.classList.remove("hidden")
    document.querySelector(".input_wrapper.name")?.classList.add("hidden")
  })

  const input: HTMLInputElement = document.querySelector(".message input")!
  const sendBtn: HTMLElement = document.querySelector(".message .send")!

  sendBtn.addEventListener("click", () => {
    sendMessage(user, input.value)
    input.value = ""
  })

  input.addEventListener("keydown", e => {
    const { code } = e

    if (code == "Enter") {
      sendMessage(user, input.value)
      input.value = ""
    }
  })
})
