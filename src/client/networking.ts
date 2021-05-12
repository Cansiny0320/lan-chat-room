import io from "socket.io-client"

import { ChatRoomType, ClientType, UserType } from "../shared/socketTypes"
import { loginError, loginOk, showOnlineUser, system, updateMessage } from "./state"

const socketProtocal = window.location.protocol.includes("https") ? "wss" : "ws"
const socket = io(`${socketProtocal}://${window.location.host}`, { reconnection: false })

const connectPromise = new Promise<void>(resolve => {
  socket.on("connect", () => {
    console.log("Connect to server!")
    resolve()
  })
})

export const connect = () => {
  connectPromise.then(() => {
    socket.on(ClientType.SYSTEM, system)
    socket.on(ChatRoomType.SHOW_ONLINE_USER, showOnlineUser)
    socket.on(ClientType.LOGIN_ERROR, loginError)
    socket.on(ClientType.lOGIN_OK, loginOk)
    socket.on(UserType.RECEIVE_MESSAGE, updateMessage)
    socket.on("disconnect", () => {
      console.log("Disconnected from server.")
    })
  })
}

export const login = (username: string, avatar: string) =>
  socket.emit(ChatRoomType.JOIN, username, avatar)

export const sendMessage = (message: string) => socket.emit(UserType.SEND_MESSAGE, message)
