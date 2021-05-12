import "./css/bootstrap-reboot.css"
import "./css/main.css"
import { connect, enter, sendMessage } from "./networking"
Promise.all([connect()])
  .then(() => {
    enter("test")
  })
  .catch(console.error)

const input = document.querySelector("input")
const sendBtn = document.querySelector(".send")

sendBtn!.addEventListener("click", () => {
  sendMessage(input?.value)
})
