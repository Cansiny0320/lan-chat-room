import { Socket } from "socket.io"
import { Type } from "../../shared/constants"
import ChatRoom from "./ChatRoom"
class SocketManger {
  io: Socket
  chatroom: ChatRoom
  constructor(io: Socket, chatroom: ChatRoom) {
    this.io = io
    this.chatroom = chatroom
  }

  listen(socket: Socket) {
    console.log(`user connected! id:${socket.id}`)
    socket.on(Type.MESSAGE, this.chatroom.message.bind(this.chatroom, socket))
    socket.on(Type.JOIN, this.chatroom.join.bind(this.chatroom, socket))
    socket.on(Type.LEAVE, this.chatroom.leave.bind(this.chatroom, socket))
  }
}

export default SocketManger
