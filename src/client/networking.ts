import io from "socket.io-client"
import User from "../server/core/User"
import { Type } from "../shared/constants"
import { messageUpdate, create } from "./state"
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
    socket.on(Type.CREATE, create)
    socket.on(Type.UPDATE, messageUpdate)
    socket.on("disconnect", () => {
      console.log("Disconnected from server.")
    })
  })
}

export const enter = (username: string) => socket.emit(Type.JOIN, username)

export const sendMessage = (user: User, message: string) => socket.emit(Type.MESSAGE, user, message)
