import { IUsers } from "../server/core/ChatRoom"

const content: HTMLElement = document.querySelector(".content")!
const online_user: HTMLElement = document.querySelector(".online_user")!
const chatroom: HTMLElement = document.querySelector("#chatroom")!
interface ImessageUpdate {
  self: boolean
  msg: string
}

interface systemInfo {
  username: string
  status: string
}

export interface IUserInfo {
  avatar: string
  username: string
}

export interface IReceiveData {
  msg: string
  avatar: string
  username: string
  side: "left" | "right"
  type: "img" | "text"
}

export function showOnlineUser(users: IUsers) {
  let html = ""
  Object.keys(users).forEach(id => {
    const user = users[id]
    html += `
    <div class="item">
      <img src='${user.avatar}' />
      <div class='nickname'>${user.name.slice(0, 10)}</div>
    </div>
    `
  })
  online_user.innerHTML = html
}

export function loginError() {
  alert("重复id！请重新输入")
}

export function loginOk(userInfo: IUserInfo) {
  localStorage.setItem("user_info", JSON.stringify(userInfo))
  document.querySelector(".input_wrapper.message")?.classList.remove("hidden")
  document.querySelector(".login")?.classList.add("hidden")
}

export function system(systemInfo: systemInfo) {
  const { username, status } = systemInfo
  content.innerHTML += `
  <p class="item content--center time">${new Date().toTimeString().substr(0, 8)}</>
  <p class="item content--center">${username} ${status}了聊天室</p>
  `
}

export function updateMessage(data: IReceiveData) {
  const { msg, side, avatar, username, type } = data
  if (type === "text") {
    content.innerHTML +=
      side === "left"
        ? `
  <div class="item content--left">
  <img class="avatar" src=${avatar}></img>
  <div class='content__info'>
  <p class='username'>${username}</p>
  <p class="msg">${msg}</p>
  </div>
  </div>
  `
        : `
  <div class="item content--right">
  <div class='content__info'>
  <p class='username'>${username}</p>
  <p class="msg">${msg}</p>
  </div>
  <img class="avatar" src=${avatar}></img>
  </div>
  `
  } else {
    content.innerHTML +=
      side === "left"
        ? `
  <div class="item content--left">
  <img class="avatar" src=${avatar}></img>
  <div class='content__info'>
  <p class='username'>${username}</p>
  <img class="send_img" src='${msg}'></img>
  </div>
  </div>
  `
        : `
  <div class="item content--right">
  <div class='content__info'>
  <p class='username'>${username}</p>
  <img class="send_img" src='${msg}'></img>
  </div>
  <img class="avatar" src=${avatar}></img>
  </div>
  `
  }
  content.scrollBy(0, 1000)
}

export function disconnect() {
  chatroom.innerHTML += "<div class='disconnect'>您已离线，请刷新重新登录</div>"
}
