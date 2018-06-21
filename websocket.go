/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 * @version: 0.1.0
 *******************************************************************************/

package main

import (
	_ "encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"net/url"
)

type WsClientConn struct {
	clientmapping map[string]*websocket.Conn
}

var wsConn *WsClientConn

var upgrader = websocket.Upgrader{
	ReadBufferSize:  ReadBufferSize,
	WriteBufferSize: WriteBufferSize,
}

func WebSocketHandler(w http.ResponseWriter, r *http.Request) {

	ws, _ := upgrader.Upgrade(w, r, nil)
	if wsConn == nil {
		wsConn = &WsClientConn{clientmapping: make(map[string]*websocket.Conn, 50)}
	}

	u := r.URL.RawQuery
	m, _ := url.ParseQuery(u)
	token := m[SessionTokenKey][0]

	wsConn.clientmapping[token] = ws
	log.Println("ws token:" + token)
	log.Printf(" %d ws client connected success!", len(wsConn.clientmapping))
}

func WsClientSend(token string, message []byte) {
	for k, v := range wsConn.clientmapping {
		if k == token {
			v.WriteMessage(1, message)
			log.Println("sending..")
		}
	}
}
