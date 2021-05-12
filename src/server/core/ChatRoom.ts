import { Socket } from "socket.io"
import { Type } from "../../shared/constants"
import User from "./User"

class ChatRoom {
  sockets: {
    [id: string]: Socket
  }
  users: {
    [id: string]: User
  }
  messages: {
    content: string
    id: string
  }[]

  constructor() {
    this.sockets = {}
    this.users = {}
    this.messages = []
  }
  join(socket: Socket, username: string) {
    this.sockets[socket.id] = socket
    this.users[socket.id] = new User(username, socket.id)
    socket.emit(Type.CREATE, new User(username, socket.id))
  }
  leave(socket: Socket) {
    delete this.sockets[socket.id]
    delete this.users[socket.id]
  }
  updateMessage(socket: Socket, msg: string, self: boolean) {
    socket.emit(Type.UPDATE, { self, msg })
  }

  message(socket: Socket, user: User, msg: string) {
    this.messages.push({
      content: msg,
      id: socket.id,
    })
    this.updateMessage(socket, msg, user.id === socket.id)
  }
}

export default ChatRoom
