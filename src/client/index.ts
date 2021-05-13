import "./css/bootstrap-reboot.css"
import "./css/main.css"

import { connect, login, sendMessage } from "./networking"

Promise.all([connect()]).then(() => {
  const img: HTMLImageElement = document.querySelector(".image img")!
  img.src = "./assets/img.png"
  const fileInput: HTMLInputElement = document.querySelector(".image #file")!
  fileInput.onchange = async () => {
    function getBase64() {
      return new Promise((resolve, reject) => {
        const file = fileInput.files![0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }
    try {
      const img = await getBase64()
      sendMessage({
        msg: img as string,
        type: "img",
      })
    } catch (e) {
      console.log(e)
    } finally {
      fileInput.value = ""
    }
  }
})

const nameInput: HTMLInputElement = document.querySelector(".login input")!
const nameBtn: HTMLButtonElement = document.querySelector(".login .send")!
nameBtn.addEventListener("click", () => {
  const avatar = `./assets/avatar${Math.floor(Math.random() * 5 + 1)}.jpg`
  if (nameInput.value.trim() !== "") {
    login(nameInput.value.trim(), avatar)
  } else {
    alert("请输入用户名")
  }
})

const input: HTMLInputElement = document.querySelector(".message .input input")!
const sendBtn: HTMLElement = document.querySelector(".message .send")!

sendBtn.addEventListener("click", () => {
  console.log(input.value)
  if (input.value) {
    sendMessage({
      msg: input.value,
      type: "text",
    })
    input.value = ""
  }
})

input.addEventListener("keydown", e => {
  const { keyCode } = e

  if (keyCode === 13) {
    if (input.value) {
      sendMessage({
        msg: input.value,
        type: "text",
      })
      input.value = ""
    }
  }
})
