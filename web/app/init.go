//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package app

import (
	"log"
)

var dbConfig DBConfiguration
var dbClient DBClient

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
