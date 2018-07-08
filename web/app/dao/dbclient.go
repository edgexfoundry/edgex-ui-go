//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import (
	"errors"
	"log"
)

const (
	UserTable        = "user"
	GatewayTable     = "gateway"
	AddressableTable = "addressable"
)

var dbConfig DBConfiguration
var dbClient DBClient

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

func getDBConfiguration() DBConfiguration {
	if dbConfig == (DBConfiguration{}) {
		dbConfig = DBConfiguration{
			DbType:       MONGO,
			Host:         "localhost",
			Port:         27017,
			Timeout:      5,
			DatabaseName: "edgex-ui-go",
			Username:     "",
			Password:     "",
		}
	}

	return dbConfig
}

func GetDBClient() DBClient {
	if dbClient == nil {
		newDbClient, err := NewDBClient(getDBConfiguration())
		if err != nil {
			log.Fatal("create new DB client error : " + err.Error())
		}

		dbClient = newDbClient
	}

	return dbClient
}

func GetGatewayDao() GatewayDao {
	return &MongoGatewayDao{}
}
