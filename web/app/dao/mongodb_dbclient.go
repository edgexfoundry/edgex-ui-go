//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import (
	"gopkg.in/mgo.v2"
	"strconv"
	"time"
)

type MongoClient struct {
	mongoDBDialInfo *mgo.DialInfo
	Session         *mgo.Session
	Database        *mgo.Database
}

func newMongoClient(config DBConfiguration) (*MongoClient, error) {
	// Create the dial info for the Mongo session
	connectionString := config.Host + ":" + strconv.Itoa(config.Port)
	mongoDBDialInfo := &mgo.DialInfo{
		Addrs:    []string{connectionString},
		Timeout:  time.Duration(config.Timeout) * time.Millisecond,
		Database: config.DatabaseName,
		Username: config.Username,
		Password: config.Password,
	}
	session, err := mgo.DialWithInfo(mongoDBDialInfo)
	if err != nil {
		return nil, err
	}

	mongoClient := &MongoClient{mongoDBDialInfo: mongoDBDialInfo, Session: session, Database: session.DB(config.DatabaseName)}
	return mongoClient, nil
}

func (mc *MongoClient) OpenSession() error {
	if mc.Session != nil {
		mc.Session.Close()
	}

	session, err := mgo.DialWithInfo(mc.mongoDBDialInfo)
	if err != nil {
		return err
	}

	mc.Session = session
	mc.Database = session.DB(mc.mongoDBDialInfo.Database)

	return nil
}

func (mc *MongoClient) CloseSession() {
	if mc.Session != nil {
		mc.Session.Close()
		mc.Session = nil
	}
}
