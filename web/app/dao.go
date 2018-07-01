//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package app

import (
	"errors"
)

const (
	UserTable        = "user"
	GatewayTable     = "gateway"
	AddressableTable = "addressable"
)

type UserDao interface {
	Get(id string, dbClient DBClient) (User, error)
	GetAll(dbClient DBClient) ([]User, error)
	Exists(id string, dbClient DBClient) (bool, error)
	Add(user User, dbClient DBClient) (string, error)
	Update(user User, dbClient DBClient) error
	Remove(id string, dbClient DBClient) error
}

type GatewayDao interface {
	Get(id string, dbClient DBClient) (Gateway, error)
	GetAll(dbClient DBClient) ([]Gateway, error)
	Exists(id string, dbClient DBClient) (bool, error)
	Add(gateway Gateway, dbClient DBClient) (string, error)
	Update(gateway Gateway, dbClient DBClient) error
	Remove(id string, dbClient DBClient) error
}

type AddressableDao interface {
	Get(id string, dbClient DBClient) (Addressable, error)
	GetAll(dbClient DBClient) ([]Addressable, error)
	Exists(id string, dbClient DBClient) (bool, error)
	Add(addressable Addressable, dbClient DBClient) (string, error)
	Update(addressable Addressable, dbClient DBClient) error
	Remove(id string, dbClient DBClient) error
}

type DatabaseType int8 // Database type enum
const (
	MONGO DatabaseType = iota
)

type DBConfiguration struct {
	DbType       DatabaseType
	Host         string
	Port         int
	Timeout      int
	DatabaseName string
	Username     string
	Password     string
}

var ErrNotFound = errors.New("Item not found")
var ErrUnsupportedDatabase = errors.New("Unsuppored database type")
var ErrInvalidObjectId = errors.New("Invalid object ID")
var ErrNotUnique = errors.New("Resource already exists")

type DBClient interface {
	OpenSession() error
	CloseSession()
}

// Return the dbClient interface
func NewDBClient(config DBConfiguration) (DBClient, error) {
	switch config.DbType {
	case MONGO:
		// Create the mongo client
		return newMongoClient(config)
	default:
		return nil, ErrUnsupportedDatabase
	}
}
