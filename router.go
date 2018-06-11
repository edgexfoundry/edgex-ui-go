package main

import (
  mux "github.com/gorilla/mux"
  "net/http"
)

func initRestRoutes() http.Handler {
  r := mux.NewRouter()

  s := r.PathPrefix("/api/v1").Subrouter()
  s.HandleFunc("/auth/login",Login).Methods("POST")
  s.HandleFunc("/auth/logout",Logout).Methods("GET")

  s.HandleFunc("/gateway",FindAllGateway).Methods("GET")
  s.HandleFunc("/gateway",SaveGateway).Methods("POST")
  s.HandleFunc("/gateway/proxy",ProxyConfigGateway).Methods("POST")

  s.HandleFunc("/exportshow",ExportShow).Methods("POST")

  s1 := r.PathPrefix("").Subrouter()
  s1.HandleFunc("/ws",WebSocketHandler)

  return r
}
