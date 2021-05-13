import { Socket } from "socket.io"
import { ISendData } from "../../client/networking"

import { ChatRoomType, ClientType, UserType } from "../../shared/socketTypes"
import { IUserSocket } from "./SocketManger"
import User from "./User"

export interface ISockets {
  [id: string]: Socket
}

export interface IUsers {
  [name: string]: User
}
class ChatRoom {
  sockets: ISockets
  users: IUsers
  messages: {
    content: string
    id: string
  }[]

  constructor() {
    this.sockets = {}
    this.users = {}
    this.messages = []
  }
  join(io: Socket, socket: IUserSocket, username: string, avatar: string) {
    if (this.users[username]) {
      socket.emit(ClientType.LOGIN_ERROR)
    } else {
      this.sockets[socket.id] = socket
      socket.username = username
      const user = new User(username, avatar, socket.id)
      this.users[username] = user
      socket.emit(ClientType.lOGIN_OK, { username, avatar })
      io.emit(ClientType.SYSTEM, {
        username,
        status: "进入",
      })
      io.emit(ChatRoomType.SHOW_ONLINE_USER, this.users)
    }
  }
  leave(io: Socket, socket: IUserSocket) {
    delete this.sockets[socket.id]
    delete this.users[socket.username]
    console.log(socket.username + " disconnected!")
    io.emit(ClientType.SYSTEM, {
      username: socket.username,
      status: "离开",
    })
    io.emit(ChatRoomType.SHOW_ONLINE_USER, this.users)
  }
  updateMessage(socket: IUserSocket, msg: string, self: boolean) {
    socket.emit(ChatRoomType.UPDATE, { self, msg })
  }

  message(socket: IUserSocket, data: ISendData) {
    const user = this.users[socket.username]
    const { avatar, name } = user
    const { msg, type } = data
    socket.broadcast.emit(UserType.RECEIVE_MESSAGE, {
      msg,
      type,
      avatar,
      side: "left",
      username: name,
    })
    socket.emit(UserType.RECEIVE_MESSAGE, {
      msg,
      type,
      avatar,
      side: "right",
      username: name,
    })
    // this.messages.push({
    //   content: msg,
    //   id: socket.id,
    // })
    // this.updateMessage(socket, msg, user.id === socket.id)
  }
}

export default ChatRoom
