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
	"crypto/md5"
	"fmt"
	"log"
	"time"

	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
	"gopkg.in/mgo.v2"
)

var (
	database      string
	dbHost        string
	dbPort        int64
	dbUserName    string
	dbPassword    string
	userScheme    string
)

type DataStore struct {
	S *mgo.Session
}

var DS DataStore

func (ds DataStore) DataStore() *DataStore {
	return &DataStore{ds.S.Copy()}
}

func loadConf() {
	database = configs.DBConf.Name
	dbHost = configs.DBConf.Host
	dbPort = configs.DBConf.Port
	dbUserName = configs.DBConf.Username
	dbPassword = configs.DBConf.Password
	userScheme = configs.DBConf.Scheme.User

	log.Println(fmt.Sprintf("mongoDB connection info %s in %s:%d with credential (%s / %x), with scheme: %s.",
		database, dbHost, dbPort, dbUserName, md5.Sum([]byte(dbPassword)), userScheme))
}

func DBConnect() bool {
	loadConf()

	mongoAddress := fmt.Sprintf("%s:%d", dbHost, dbPort)
	mongoDBDialInfo := &mgo.DialInfo{
		Addrs:    []string{mongoAddress},
		Timeout:  time.Duration(5000) * time.Millisecond,
		Database: database,
		Username: dbUserName,
		Password: dbPassword,
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
