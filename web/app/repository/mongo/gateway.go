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
	"log"
	"time"
	"gopkg.in/mgo.v2/bson"
	"github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
)

type GatewayMongoRepository struct {
}

func (gr *GatewayMongoRepository) Insert(g *domain.Gateway) (string, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(gatewayTable)
	timestamp := time.Now().UnixNano() / 1000000
	g.Created = timestamp
	err := coll.Insert(g)

	if err != nil {
		log.Println("Insert gateway failed !")
		return "", err
	}

	return g.Id.Hex(), nil
}

func (gr *GatewayMongoRepository) Delete(id string) error {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(gatewayTable)
	err := coll.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		log.Println("Delete gateway failed!" + err.Error())
		return err
	}
	return nil
}

func (gr *GatewayMongoRepository) SelectAll() ([]domain.Gateway, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(gatewayTable)

	result := make([]domain.Gateway, 0)
	err := coll.Find(nil).All(&result)
	if err != nil {
		log.Println("SelectAll failed!")
		return nil, err
	}
	return result, nil
}

func (gr *GatewayMongoRepository) Select(id string) (domain.Gateway, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(gatewayTable)

	result := domain.Gateway{}
	err := coll.Find(nil).One(&result)
	if err != nil {
		log.Println("Select failed!")
		return result, err
	}
	return result, nil
}

func (gr *GatewayMongoRepository) Exists(id string) (bool, error) {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(gatewayTable)
	count, err := coll.Find(bson.M{"_id": bson.ObjectIdHex(id)}).Count()

	if err != nil {
		log.Println("Check gateway exists failed !")
		return false, err
	}

	return count > 0, nil
}

func (gr *GatewayMongoRepository) Update(gateway domain.Gateway) error {
	ds := DS.DataStore()
	defer ds.S.Close()

	coll := ds.S.DB(database).C(gatewayTable)
	timestamp := time.Now().UnixNano() / 1000000
	gateway.Modified = timestamp
	err := coll.UpdateId(gateway.Id, &gateway)

	if err != nil {
		log.Println("Update gateway failed !")
		return err
	}

	return nil
}
