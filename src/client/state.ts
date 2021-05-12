import { IUsers } from "../server/core/ChatRoom"

const content: HTMLElement = document.querySelector(".content")!
const online_user: HTMLElement = document.querySelector(".online_user")!
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

export interface IData {
  msg: string
  avatar: string
  username: string
  side: "left" | "right"
}

export function showOnlineUser(users: IUsers) {
  let html = ""
  Object.keys(users).forEach(id => {
    const user = users[id]
    html += `
    <div class="item">
      <img src='${user.avatar}' />
      <div class='nickname'>${user.name.slice(0, 3)}</div>
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
  <p class="item content--center">${new Date().toTimeString().substr(0, 8)}</>
  <p class="item content--center">${username} ${status}了聊天室</p>
  `
}

export function updateMessage(data: IData) {
  const { msg, side, avatar, username } = data
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
  side === "right" && content.scrollBy(0, 1000)
}
