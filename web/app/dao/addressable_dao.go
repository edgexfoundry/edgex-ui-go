//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"

type AddressableDao interface {
	Get(id string, dbClient DBClient) (domain.Addressable, error)
	GetAll(dbClient DBClient) ([]domain.Addressable, error)
	Exists(id string, dbClient DBClient) (bool, error)
	Add(addressable domain.Addressable, dbClient DBClient) (string, error)
	Update(addressable domain.Addressable, dbClient DBClient) error
	Remove(id string, dbClient DBClient) error
}
