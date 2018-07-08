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
 * Addressable Dao implement for MongoDB
 */
type MongoAddressableDao struct {
}

func (dao *MongoAddressableDao) Get(id string, dbClient DBClient) (domain.Addressable, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return domain.Addressable{}, errors.New("can not get mongo client")
	}

	var addressable domain.Addressable
	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).FindId(bson.ObjectIdHex(id)).One(&addressable)
	if err == mgo.ErrNotFound {
		return addressable, ErrNotFound
	}

	return addressable, err
}

func (dao *MongoAddressableDao) GetAll(dbClient DBClient) ([]domain.Addressable, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return []domain.Addressable{}, errors.New("can not get mongo client")
	}

	var addressables []domain.Addressable
	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).Find(bson.M{}).All(&addressables)
	if err == mgo.ErrNotFound {
		return addressables, ErrNotFound
	}

	return addressables, err
}

func (dao *MongoAddressableDao) Exists(id string, dbClient DBClient) (bool, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return false, errors.New("can not get mongo client")
	}

	count, err := mc.Session.DB(mc.Database.Name).C(AddressableTable).FindId(bson.ObjectIdHex(id)).Count()
	if err != nil {
		return false, err
	}

	return count > 0, err
}

func (dao *MongoAddressableDao) Add(addressable domain.Addressable, dbClient DBClient) (string, error) {
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

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return "", errors.New("can not get mongo client")
	}

	addressable.Id = bson.NewObjectId()

	err := mc.Session.DB(mc.Database.Name).C(AddressableTable).Insert(&addressable)

	return addressable.Id.Hex(), err
}

func (dao *MongoAddressableDao) Update(addressable domain.Addressable, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
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

	mc, ok := dbClient.(*MongoClient)
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
