//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package app

import (
	"errors"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"strconv"
	"time"
)

var currentMongoClient *MongoClient

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

	mongoClient := &MongoClient{Session: session, Database: session.DB(config.DatabaseName)}
	currentMongoClient = mongoClient // Set the singleton
	return mongoClient, nil
}

func (mc MongoClient) OpenSession() error {
	if mc.Session != nil {
		mc.CloseSession()
	}

	session, err := mgo.DialWithInfo(mc.mongoDBDialInfo)
	if err != nil {
		return err
	}

	mc.Session = session
	mc.Database = session.DB(mc.mongoDBDialInfo.Database)

	return nil
}

func (mc MongoClient) CloseSession() {
	if mc.Session != nil {
		mc.Session.Close()
	}
}

/**
 * User Dao implement for MongoDB
 */
type MongoUserDao struct {
}

func (dao *MongoUserDao) Get(id string, dbClient DBClient) (User, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return User{}, errors.New("can not get mongo client")
	}

	var user User
	err := mc.Session.DB(mc.Database.Name).C(UserTable).FindId(bson.ObjectIdHex(id)).One(&user)
	if err == mgo.ErrNotFound {
		return user, ErrNotFound
	}

	return user, err
}

func (dao *MongoUserDao) GetAll(dbClient DBClient) ([]User, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return []User{}, errors.New("can not get mongo client")
	}

	var users []User
	err := mc.Session.DB(mc.Database.Name).C(UserTable).Find(bson.M{}).All(&users)
	if err == mgo.ErrNotFound {
		return users, ErrNotFound
	}

	return users, err
}

func (dao *MongoUserDao) Exists(id string, dbClient DBClient) (bool, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return false, errors.New("can not get mongo client")
	}

	count, err := mc.Session.DB(mc.Database.Name).C(UserTable).FindId(bson.ObjectIdHex(id)).Count()
	if err != nil {
		return false, err
	}

	return count > 0, err
}

func (dao *MongoUserDao) Add(user User, dbClient DBClient) (string, error) {
	var id string
	if exists, err := dao.Exists(user.Id.Hex(), dbClient); exists || err == nil {
		if exists {
			return id, ErrNotUnique
		}

		if err != nil {
			return id, err
		}
	}

	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return "", errors.New("can not get mongo client")
	}

	user.Id = bson.NewObjectId()

	err := mc.Session.DB(mc.Database.Name).C(UserTable).Insert(&user)

	return user.Id.Hex(), err
}

func (dao *MongoUserDao) Update(user User, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return errors.New("can not get mongo client")
	}

	err := mc.Session.DB(mc.Database.Name).C(UserTable).UpdateId(user.Id, user)
	if err == mgo.ErrNotFound {
		return ErrNotFound
	}

	return err
}

func (dao *MongoUserDao) Remove(id string, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return errors.New("can not get mongo client")
	}

	if !bson.IsObjectIdHex(id) {
		return ErrInvalidObjectId
	}

	err := mc.Session.DB(mc.Database.Name).C(UserTable).RemoveId(id)
	if err == mgo.ErrNotFound {
		return ErrNotFound
	}

	return err
}

/**
 * Gateway Dao implement for MongoDB
 */
type MongoGatewayDao struct {
}

func (dao *MongoGatewayDao) Get(id string, dbClient DBClient) (Gateway, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return Gateway{}, errors.New("can not get mongo client")
	}

	var gateway Gateway
	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).FindId(bson.ObjectIdHex(id)).One(&gateway)
	if err == mgo.ErrNotFound {
		return gateway, ErrNotFound
	}

	return gateway, err
}

func (dao *MongoGatewayDao) GetAll(dbClient DBClient) ([]Gateway, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return []Gateway{}, errors.New("can not get mongo client")
	}

	var gateways []Gateway
	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).Find(bson.M{}).All(&gateways)
	if err == mgo.ErrNotFound {
		return gateways, ErrNotFound
	}

	return gateways, err
}

func (dao *MongoGatewayDao) Exists(id string, dbClient DBClient) (bool, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return false, errors.New("can not get mongo client")
	}

	count, err := mc.Session.DB(mc.Database.Name).C(GatewayTable).FindId(bson.ObjectIdHex(id)).Count()
	if err != nil {
		return false, err
	}

	return count > 0, err
}

func (dao *MongoGatewayDao) Add(gateway Gateway, dbClient DBClient) (string, error) {
	var id string
	if exists, err := dao.Exists(gateway.Id.Hex(), dbClient); exists || err == nil {
		if exists {
			return id, ErrNotUnique
		}

		if err != nil {
			return id, err
		}
	}

	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return "", errors.New("can not get mongo client")
	}

	gateway.Id = bson.NewObjectId()

	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).Insert(&gateway)

	return gateway.Id.Hex(), err
}

func (dao *MongoGatewayDao) Update(gateway Gateway, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return errors.New("can not get mongo client")
	}

	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).UpdateId(gateway.Id, gateway)
	if err == mgo.ErrNotFound {
		return ErrNotFound
	}

	return err
}

func (dao *MongoGatewayDao) Remove(id string, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return errors.New("can not get mongo client")
	}

	if !bson.IsObjectIdHex(id) {
		return ErrInvalidObjectId
	}

	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).RemoveId(id)
	if err == mgo.ErrNotFound {
		return ErrNotFound
	}

	return err
}

/**
 * Addressable Dao implement for MongoDB
 */
type MongoAddressableDao struct {
}

func (dao *MongoAddressableDao) Get(id string, dbClient DBClient) (Addressable, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return Addressable{}, errors.New("can not get mongo client")
	}

	var addressable Addressable
	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).FindId(bson.ObjectIdHex(id)).One(&addressable)
	if err == mgo.ErrNotFound {
		return addressable, ErrNotFound
	}

	return addressable, err
}

func (dao *MongoAddressableDao) GetAll(dbClient DBClient) ([]Addressable, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return []Addressable{}, errors.New("can not get mongo client")
	}

	var addressables []Addressable
	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).Find(bson.M{}).All(&addressables)
	if err == mgo.ErrNotFound {
		return addressables, ErrNotFound
	}

	return addressables, err
}

func (dao *MongoAddressableDao) Exists(id string, dbClient DBClient) (bool, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return false, errors.New("can not get mongo client")
	}

	count, err := mc.Session.DB(mc.Database.Name).C(AddressableTable).FindId(bson.ObjectIdHex(id)).Count()
	if err != nil {
		return false, err
	}

	return count > 0, err
}

func (dao *MongoAddressableDao) Add(addressable Addressable, dbClient DBClient) (string, error) {
	var id string
	if exists, err := dao.Exists(addressable.Id.Hex(), dbClient); exists || err == nil {
		if exists {
			return id, ErrNotUnique
		}

		if err != nil {
			return id, err
		}
	}

	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return "", errors.New("can not get mongo client")
	}

	addressable.Id = bson.NewObjectId()

	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).Insert(&addressable)

	return addressable.Id.Hex(), err
}

func (dao *MongoAddressableDao) Update(addressable Addressable, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return errors.New("can not get mongo client")
	}

	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).UpdateId(addressable.Id, addressable)
	if err == mgo.ErrNotFound {
		return ErrNotFound
	}

	return err
}

func (dao *MongoAddressableDao) Remove(id string, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(MongoClient)
	if !ok {
		return errors.New("can not get mongo client")
	}

	if !bson.IsObjectIdHex(id) {
		return ErrInvalidObjectId
	}

	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).RemoveId(id)
	if err == mgo.ErrNotFound {
		return ErrNotFound
	}

	return err
}
