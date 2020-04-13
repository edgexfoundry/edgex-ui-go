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

package mm

import (
	"time"

	"github.com/edgexfoundry/edgex-ui-go/internal/errors"

	"github.com/edgexfoundry/edgex-ui-go/internal/domain"
	"gopkg.in/mgo.v2/bson"
)

type UserRepository struct {
}

func (ur *UserRepository) ExistsUser(u domain.User) (domain.User, error) {
	for _, v := range dataStore.Users {
		if v.Name == u.Name && v.Password == u.Password {
			return v, nil
		}
	}
	return domain.User{}, errors.NewErrResourceNotFound()
}

func (ur *UserRepository) Exists(id string) (bool, error) {
	return false, nil
}

func (ur *UserRepository) Insert(u domain.User) (string, error) {
	ts := time.Now().UnixNano() / 1000000
	u.Created = ts
	u.Id = bson.NewObjectId()

	dataStore.Users = append(dataStore.Users, u)
	return u.Id.Hex(), nil
}

func (ur *UserRepository) Update(u domain.User) error {

	return nil
}

func (ur *UserRepository) Delete(id string) error {

	return nil
}

func (ur *UserRepository) Select(id string) (domain.User, error) {

	return dataStore.Users[0], nil
}

func (ur *UserRepository) SelectByName(name string) (domain.User, error) {
	for _, u := range dataStore.Users {
		if u.Name == name {
			return u, nil
		}
	}
	return domain.User{}, errors.NewErrResourceNotFound()
}

func (ur *UserRepository) SelectAll() ([]domain.User, error) {

	return dataStore.Users, nil
}
