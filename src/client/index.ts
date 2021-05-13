import "./css/bootstrap-reboot.css"
import "./css/main.css"

import { connect, login, sendMessage } from "./networking"

Promise.all([connect()]).then(() => {
  const img: HTMLImageElement = document.querySelector(".image img")!
  img.src = "./assets/img.png"
  const fileInput: HTMLInputElement = document.querySelector(".image #file")!
  fileInput.onchange = () => {
    const file = fileInput.files![0]

    const reader = new FileReader()

    //文件读取出错的时候触发
    reader.onerror = function () {
      console.log("读取文件失败，请重试！")
    }
    // 读取成功后
    reader.onload = function () {
      const img = reader.result // 读取结果
      sendMessage({
        msg: img as string,
        type: "img",
      })
      fileInput.value = ""
    }
    reader.readAsDataURL(file) // 读取为64位
  }
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

  const input: HTMLInputElement = document.querySelector(".message input")!
  const sendBtn: HTMLElement = document.querySelector(".message .send")!

  sendBtn.addEventListener("click", () => {
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
})
