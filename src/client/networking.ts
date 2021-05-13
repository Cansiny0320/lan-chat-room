import io from "socket.io-client"

import { ChatRoomType, ClientType, UserType } from "../shared/socketTypes"
import { loginError, loginOk, showOnlineUser, system, updateMessage, disconnect } from "./state"

export interface ISendData {
  msg: string
  type: "img" | "text"
}

const socketProtocal = window.location.protocol.includes("https") ? "wss" : "ws"
const socket = io(`${socketProtocal}://${window.location.host}`, { reconnection: false })

const connectPromise = new Promise<void>(resolve => {
  socket.on("connect", () => {
    resolve()
  })
})

export const connect = () => {
  connectPromise.then(() => {
    const fileInput: HTMLInputElement = document.querySelector(".image #file")!
    socket.on(ClientType.SYSTEM, system)
    socket.on(ChatRoomType.SHOW_ONLINE_USER, showOnlineUser)
    socket.on(ClientType.LOGIN_ERROR, loginError)
    socket.on(ClientType.lOGIN_OK, loginOk)
    socket.on(UserType.RECEIVE_MESSAGE, updateMessage)
    socket.on("disconnect", () => {
      disconnect()
    })
  })
}

export const login = (username: string, avatar: string) =>
  socket.emit(ChatRoomType.JOIN, username, avatar)

export const sendMessage = (data: ISendData) => socket.emit(UserType.SEND_MESSAGE, data)
