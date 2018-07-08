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
 * User Dao implement for MongoDB
 */
type MongoUserDao struct {
}

func (dao MongoUserDao) Get(id string, dbClient DBClient) (domain.User, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return domain.User{}, errors.New("can not get mongo client")
	}

	var user domain.User
	err := mc.Session.DB(mc.Database.Name).C(UserTable).FindId(bson.ObjectIdHex(id)).One(&user)
	if err == mgo.ErrNotFound {
		return user, ErrNotFound
	}

	return user, err
}

func (dao *MongoUserDao) GetAll(dbClient DBClient) ([]domain.User, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return []domain.User{}, errors.New("can not get mongo client")
	}

	var users []domain.User
	err := mc.Session.DB(mc.Database.Name).C(UserTable).Find(bson.M{}).All(&users)
	if err == mgo.ErrNotFound {
		return users, ErrNotFound
	}

	return users, err
}

func (dao *MongoUserDao) Exists(id string, dbClient DBClient) (bool, error) {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return false, errors.New("can not get mongo client")
	}

	count, err := mc.Session.DB(mc.Database.Name).C(UserTable).FindId(bson.ObjectIdHex(id)).Count()
	if err != nil {
		return false, err
	}

	return count > 0, err
}

func (dao *MongoUserDao) Add(user domain.User, dbClient DBClient) (string, error) {
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

	mc, ok := dbClient.(*MongoClient)
	if !ok {
		return "", errors.New("can not get mongo client")
	}

	user.Id = bson.NewObjectId()

	err := mc.Session.DB(mc.Database.Name).C(UserTable).Insert(&user)

	return user.Id.Hex(), err
}

func (dao *MongoUserDao) Update(user domain.User, dbClient DBClient) error {
	dbClient.OpenSession()
	defer dbClient.CloseSession()

	mc, ok := dbClient.(*MongoClient)
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

	mc, ok := dbClient.(*MongoClient)
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
