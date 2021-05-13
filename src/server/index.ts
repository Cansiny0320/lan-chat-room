import express from "express"
import socketio, { Socket } from "socket.io"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import internalIp from "internal-ip"

import webpackConfig from "../../webpack.dev"
import { ChatRoomType } from "../shared/socketTypes"
import ChatRoom from "./core/ChatRoom"
import SocketManger from "./core/SocketManger"

const app = express()
app.use(express.static("public"))

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler))
} else {
  app.use(express.static("dist"))
}

function getIPAddress() {
  return internalIp.v4()
}

const port = 3000

async function run() {
  const domain = await getIPAddress()
  const server = app.listen(port, domain as string, () => {
    console.log(`Server is running at http://${domain}:${port}`)
  })
  const chatroom = new ChatRoom()

  const io: Socket = (socketio as unknown as Function)(server)
  const socket = new SocketManger(io, chatroom)

  io.on("connect", item => {
    io.emit(ChatRoomType.SHOW_ONLINE_USER, chatroom.users)
    socket.listen(item)
  })
}

run()
