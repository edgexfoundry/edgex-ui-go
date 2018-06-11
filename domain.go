package main

import (

)

type User struct {
  Id          string   `json:"id"`
  Name        string   `json:"name"`
  Password    string   `json:"password"`
}

type Gateway struct {
  Id          string   `json:"id"`
  Name        string   `json:"name"`
  Description string   `json:"description"`
  Address     string   `json:"address"`
}

type Addressable struct {
  Id          string    `json:"id"`
  Name        string    `json:"name"`
  Protocol    string    `json:"protocol"`
  Address     string    `json:"address"`
  Port        int       `json:"port"`
  Path        string    `json:"path"`

  Publisher   string    `json:"publisher"`
  User        string    `json:"user"`
  Password    string    `json:"password"`
  Topic       string    `json:"topic"`
}
