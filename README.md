# 👨‍🚀 局域网聊天室

用 socket.io 实现的局域网聊天室 可通过内网穿透发布到公网

## ✨ 特性

- 用户进入/离开提示
- 显示在线用户
- 发送图片

## 使用方法

1. 连上局域网

2. 运行命令

```bash
$ yarn start
```

3. 进入终端显示的地址

4. chat with your friend!

## 遇到的一些问题

- 发送图片大于 1M 会断开连接，socket.io 默认限制了 socket message 的大小，可以通过配置`maxHttpBufferSize`解决
  ```typescript
  const io: Socket = (socketio as unknown as Function)(server, {
    maxHttpBufferSize: 1e8,
  })
  ```
- socket.io 跨域，和路由跨域不同，需要单独配置 socket 的 cors
  ```typescript
  const io: Socket = (socketio as unknown as Function)(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  })
  ```
