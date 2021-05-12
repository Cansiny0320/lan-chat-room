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
  messages: string[]
  constructor() {
    this.sockets = {}
    this.users = {}
    this.messages = []
    setInterval(this.update.bind(this), 100)
  }
  join(socket: Socket, username: string) {
    this.sockets[socket.id] = socket
    this.users[socket.id] = new User(username, socket.id)
  }
  leave(socket: Socket) {
    delete this.sockets[socket.id]
    delete this.users[socket.id]
  }
  update() {
    Object.keys(this.sockets).map(playerID => {
      const socket = this.sockets[playerID]
      const player = this.users[playerID]
      socket.emit(Type.UPDATE, this.messages)
    })
  }
  message(msg: string) {
    this.messages.push(msg)
  }
}

export default ChatRoom
