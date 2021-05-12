import { Socket } from "socket.io"
import { ChatRoomType, UserType } from "../../shared/socketTypes"
import ChatRoom from "./ChatRoom"

export interface IUserSocket extends Socket {
  username: string
}
class SocketManger {
  io: Socket
  chatroom: ChatRoom
  constructor(io: Socket, chatroom: ChatRoom) {
    this.io = io
    this.chatroom = chatroom
  }

  listen(socket: IUserSocket) {
    console.log(`user connected! id:${socket.id}`)
    socket.on(UserType.SEND_MESSAGE, this.chatroom.message.bind(this.chatroom, socket))
    socket.on(ChatRoomType.JOIN, this.chatroom.join.bind(this.chatroom, this.io, socket))
    socket.on(ChatRoomType.LEAVE, this.chatroom.leave.bind(this.chatroom, socket))
  }
}

export default SocketManger
