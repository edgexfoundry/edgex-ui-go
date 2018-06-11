package main

import (
  "log"
  "github.com/gorilla/websocket"
  "net/http"
  "net/url"
  _ "encoding/json"
)

type WsClientConn struct {
  //{token:wsConn}
  clientmapping map[string]*websocket.Conn
}

var wsConn *WsClientConn

var upgrader = websocket.Upgrader {
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func WebSocketHandler(w http.ResponseWriter, r *http.Request) {

  ws, _ := upgrader.Upgrade(w,r,nil)
  if wsConn == nil {
    wsConn = &WsClientConn{clientmapping:make(map[string]*websocket.Conn, 50)}
  }

  u := r.URL.RawQuery
  m, _ := url.ParseQuery(u)
  token := m["X-Session-Token"][0]

  wsConn.clientmapping[token] = ws
  log.Println("ws token:" + token)
  log.Printf(" %d ws client connected success!",len(wsConn.clientmapping))
}

func WsClientSend(token string, message []byte){
  for k,v := range wsConn.clientmapping {
    if k == token {
      //j , _ := json.Marshal(string(message))
      v.WriteMessage(1,message)
      log.Println("sending..")
    }
  }
}
