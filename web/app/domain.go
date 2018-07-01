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
 * @version: 0.1.0
 *******************************************************************************/

package app

import "gopkg.in/mgo.v2/bson"

type User struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Name     string        `json:"name"`
	Password string        `json:"password"`
}

type Gateway struct {
	Id          bson.ObjectId `bson:"_id,omitempty"`
	Name        string        `json:"name"`
	Description string        `json:"description"`
	Address     string        `json:"address"`
}

type Addressable struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Name     string        `json:"name"`
	Protocol string        `json:"protocol"`
	Address  string        `json:"address"`
	Port     int           `json:"port"`
	Path     string        `json:"path"`

	Publisher string `json:"publisher"`
	User      string `json:"user"`
	Password  string `json:"password"`
	Topic     string `json:"topic"`
}
