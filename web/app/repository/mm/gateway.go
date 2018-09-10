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
   "gopkg.in/mgo.v2/bson"
   "github.com/edgexfoundry/edgex-ui-go/web/app/domain"
 )

 type GatewayRepository struct {
 }

 func (gr *GatewayRepository) Insert(g *domain.Gateway) (string, error) {

   	timestamp := time.Now().UnixNano() / 1000000
   	g.Created = timestamp
    g.Id = bson.NewObjectId()
   	dataStore.Gateways = append(dataStore.Gateways,*g)

   	return g.Id.Hex(), nil
 }

 func (gr *GatewayRepository) SelectAll() ([]domain.Gateway, error) {

 	return dataStore.Gateways, nil
 }

 func (gr *GatewayRepository) Exists(id string) (bool, error) {
   return true,nil
 }

 func (gr *GatewayRepository) Select(id string) (domain.Gateway, error) {
   return dataStore.Gateways[0],nil
 }

 func (gr *GatewayRepository) Update(gateway domain.Gateway) error {
   return nil
 }

 func (gr *GatewayRepository) Delete(id string) error {
   return nil
 }
