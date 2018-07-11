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
  mgo "gopkg.in/mgo.v2"
)

const (

)

type DataStore struct {
  S *mgo.Session
}

var DS DataStore

func (ds DataStore) DataStore() *DataStore {
  return &DataStore{ds.S.Copy()}
}

func DBConnect() bool {
  mongoDBDialInfo := &mgo.DialInfo {
    Addrs    : []string{"10.211.55.7:27018"},
    Timeout  : time.Duration(5000) * time.Millisecond,
    Database : "edgex-ui-go",
    Username : "su",
    Password : "su",
  }
  s, err := mgo.DialWithInfo(mongoDBDialInfo)
  if err != nil {
    log.Println("Connect to mongoDB failed !")
    return false
  }
  s.SetSocketTimeout(time.Duration(5000) * time.Millisecond)
  DS.S = s
  log.Println("Success connect to mongoDB !")
  return true
}
