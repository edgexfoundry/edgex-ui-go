//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import (
	"errors"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

/**
 * Gateway Dao implement for MongoDB
 */
type MongoGatewayDao struct {
}

func (dao *MongoGatewayDao) Get(id string, dbClient DBClient) (domain.Gateway, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return domain.Gateway{}, errors.New("can not get mongo client")
	}

	var gateway domain.Gateway
	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).FindId(bson.ObjectIdHex(id)).One(&gateway)
	if err == mgo.ErrNotFound {
		return gateway, ErrNotFound
	}

	return gateway, err
}

func (dao *MongoGatewayDao) GetAll(dbClient DBClient) ([]domain.Gateway, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return []domain.Gateway{}, errors.New("can not get mongodb client")
	}

	var gateways []domain.Gateway
	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).Find(bson.M{}).All(&gateways)

	if err == mgo.ErrNotFound {
		return gateways, ErrNotFound
	}

	return gateways, err
}

func (dao *MongoGatewayDao) Exists(id string, dbClient DBClient) (bool, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return false, errors.New("can not get mongo client")
	}

	count, err := mc.Session.DB(mc.Database.Name).C(GatewayTable).FindId(bson.ObjectIdHex(id)).Count()
	if err != nil {
		return false, err
	}

	return count > 0, err
}

func (dao *MongoGatewayDao) Add(gateway domain.Gateway, dbClient DBClient) (string, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return "", errors.New("can not get mongo client")
	}

	gateway.Id = bson.NewObjectId()

	err := mc.Session.DB(mc.Database.Name).C(GatewayTable).Insert(&gateway)

	return gateway.Id.Hex(), err
}

func (dao *MongoGatewayDao) Update(gateway domain.Gateway, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
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

	mc, ok := dbClient.(*MongoClient)
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
