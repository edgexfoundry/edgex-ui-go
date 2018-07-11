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

package repository

import (
  "log"
  bson "gopkg.in/mgo.v2/bson"
  "github.com/edgexfoundry-holding/edgex-ui-go/web/app/mongo"
  "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
)

type GatewayRepository struct {

}

var GatewayRepos = &GatewayRepository{}

func (gr *GatewayRepository) SaveOne(g *domain.Gateway) {
  ds := mongo.DS.DataStore()
  defer ds.S.Close()

  coll := ds.S.DB("edgex-ui-go").C("gateway")
  err := coll.Insert(g)

  if err != nil {
    log.Println("SaveOne gateway failed !")
  }
}

func (gr *GatewayRepository) DeleteOne(id string) bool {
  ds := mongo.DS.DataStore()
  defer ds.S.Close()

  coll := ds.S.DB("edgex-ui-go").C("gateway")
  err := coll.Remove(bson.M{"_id" : bson.ObjectIdHex(id)})
  if err != nil {
    log.Println("DelteOne gateway failed!" + err.Error())
    return false
  }
  return true
}

func (gr *GatewayRepository) FindAll() []domain.Gateway {
  ds := mongo.DS.DataStore()
  defer ds.S.Close()

  coll := ds.S.DB("edgex-ui-go").C("gateway")

  result := make([]domain.Gateway,0)
  err := coll.Find(nil).All(&result)
  if err != nil {
      log.Println("FindAll Query failed!")
      return nil
  }
  return result
}
