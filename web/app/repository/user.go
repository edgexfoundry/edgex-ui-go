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
  bson "gopkg.in/mgo.v2/bson"
  "github.com/edgexfoundry-holding/edgex-ui-go/web/app/mongo"
  "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"
)

type UserRepository struct {

}

var UserRepos = &UserRepository{}

func (ur *UserRepository) IsExist(u domain.User) bool {
  ds := mongo.DS.DataStore()
  defer ds.S.Close()

  coll := ds.S.DB("edgex-ui-go").C("user")
  one,err := coll.Find(bson.M{"name": u.Name,"password":u.Password}).Count()
  if err == nil && one == 1 {
    return true
  }
  return false
}
