# ð¨âð å±åç½èå¤©å®¤

ç¨ socket.io å®ç°çå±åç½èå¤©å®¤ å¯éè¿åç½ç©¿éåå¸å°å¬ç½

## â¨ ç¹æ§

- ç¨æ·è¿å¥/ç¦»å¼æç¤º
- æ¾ç¤ºå¨çº¿ç¨æ·
- åéå¾ç

## ä½¿ç¨æ¹æ³

1. è¿ä¸å±åç½

2. è¿è¡å½ä»¤

```bash
$ yarn start
```

3. è¿å¥ç»ç«¯æ¾ç¤ºçå°å

4. chat with your friend!

## éå°çä¸äºé®é¢

- åéå¾çå¤§äº 1M ä¼æ­å¼è¿æ¥ï¼socket.io é»è®¤éå¶äº socket message çå¤§å°ï¼å¯ä»¥éè¿éç½®`maxHttpBufferSize`è§£å³
  ```typescript
  const io: Socket = (socketio as unknown as Function)(server, {
    maxHttpBufferSize: 1e8,
  })
  ```
- socket.io è·¨åï¼åè·¯ç±è·¨åä¸åï¼éè¦åç¬éç½® socket ç cors
  ```typescript
  const io: Socket = (socketio as unknown as Function)(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  })
  ```
