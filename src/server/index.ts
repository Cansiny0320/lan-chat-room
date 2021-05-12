import express from "express"
import http from "http"
import socketio, { Socket } from "socket.io"
import ChatRoom from "./core/ChatRoom"
import SocketManger from "./core/SocketManger"
import { ChatRoomType } from "../shared/socketTypes"
import webpack from "webpack"
import webpackConfig from "../../webpack.dev"
import webpackDevMiddleware from "webpack-dev-middleware"

const app = express()
app.use(express.static("public"))

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler))
} else {
  app.use(express.static("dist"))
}

const port = 3000

const server = app.listen(port, "192.168.43.22", () => {
  console.log(`Server is running at http://localhost:${port}`)
})

const chatroom = new ChatRoom()

const io: Socket = (socketio as unknown as Function)(server)
const socket = new SocketManger(io, chatroom)

io.on("connect", item => {
  io.emit(ChatRoomType.SHOW_ONLINE_USER, chatroom.users)
  socket.listen(item)
})
