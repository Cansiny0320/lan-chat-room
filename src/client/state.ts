import { Socket } from "socket.io"
import User from "../server/core/User"

const content = document.querySelector(".content")
export let user: User
interface ImessageUpdate {
  self: boolean
  msg: string
}

export function messageUpdate(props: ImessageUpdate) {
  const { self, msg } = props
  console.log(1)

  content!.innerHTML += `<div class=${self && "self"}>${msg}</div>`
}

export function create(createdUser: User) {
  user = createdUser
}
