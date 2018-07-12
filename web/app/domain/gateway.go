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
 *******************************************************************************/

package domain

import (
	"encoding/json"
	"gopkg.in/mgo.v2/bson"
)

type Gateway struct {
	Id          bson.ObjectId `bson:"_id,omitempty" json:"id"`
	Name        string        `json:"name"`
	Description string        `json:"description"`
	Address     string        `json:"address"`
}

func (g Gateway) MarshalJSON() ([]byte, error) {
  t := struct {
    Id            *bson.ObjectId   `json:"id"`
    Name          *string          `json:"name"`
    Description   *string          `json:"description"`
		Address       *string          `json:"address"`
  }{
    Id            : &g.Id,
    Name          : &g.Name,
    Description   : &g.Description,
		Address			  : &g.Address,
  }
  return json.Marshal(t)
}

func (g *Gateway) UnmarshalJSON(b []byte) error {
	t := struct {
		Id            bson.ObjectId    `bson:"_id,omitempty" json:"id"`
    Name          string           `json:"name"`
    Description   string           `json:"description"`
		Address       string           `json:"address"`
	}{}
	if err := json.Unmarshal(b, &t); err != nil {
		return err
	}
	g.Id          = t.Id
	g.Name        = t.Name
	g.Description = t.Description
	g.Address     = t.Address
	return nil
}
