import express from "express"
import socketio, { Socket } from "socket.io"
import ChatRoom from "./core/ChatRoom"
import SocketManger from "./core/SocketManger"
import webpack from "webpack"
import webpackConfig from "../../webpack.dev"
import webpackDevMiddleware from "webpack-dev-middleware"
const app = express()

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler))
} else {
  app.use(express.static("dist"))
}

const port: number = 3000

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`)
})

const chatroom = new ChatRoom()

const io: Socket = (socketio as unknown as Function)(server)
const socket = new SocketManger(io, chatroom)

io.on("connect", item => {
  socket.listen(item)
})
