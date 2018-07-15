/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

package mongo

import (
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
	"gopkg.in/mgo.v2/bson"
	"log"
)

type UserMongoRepository struct {
}

func (ur *UserMongoRepository) ExistsUser(u domain.User) (bool, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(userTable)
	count, err := coll.Find(bson.M{"name": u.Name, "password": u.Password}).Count()
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func (ur *UserMongoRepository) Exists(id string) (bool, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB("edgex-ui-go").C(userTable)
	count, err := coll.Find(bson.M{"_id": bson.ObjectIdHex(id)}).Count()

	if err != nil {
		log.Println("Check user exists failed !")
		return false, err
	}

	return count > 0, nil
}

func (ur *UserMongoRepository) Insert(user domain.User) (string, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(userTable)
	err := coll.Insert(user)

	if err != nil {
		log.Println("Insert user failed !")
		return "", err
	}

	return user.Id.Hex(), nil
}

func (ur *UserMongoRepository) Update(user domain.User) error {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(userTable)
	err := coll.UpdateId(user.Id, &user)

	if err != nil {
		log.Println("Update user failed !")
		return err
	}

	return nil
}

func (ur *UserMongoRepository) Delete(id string) error {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(userTable)
	err := coll.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		log.Println("Delete user failed!" + err.Error())
		return err
	}
	return nil
}

func (ur *UserMongoRepository) Select(id string) (domain.User, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(userTable)

	result := domain.User{}
	err := coll.Find(nil).One(&result)
	if err != nil {
		log.Println("Select failed!")
		return result, err
	}
	return result, nil
}

func (ur *UserMongoRepository) SelectAll() ([]domain.User, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(userTable)

	result := make([]domain.User, 0)
	err := coll.Find(nil).All(&result)
	if err != nil {
		log.Println("SelectAll failed!")
		return nil, err
	}
	return result, nil
}
