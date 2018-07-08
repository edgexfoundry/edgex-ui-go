//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"

type GatewayDao interface {
	Get(id string, dbClient DBClient) (domain.Gateway, error)
	GetAll(dbClient DBClient) ([]domain.Gateway, error)
	Exists(id string, dbClient DBClient) (bool, error)
	Add(gateway domain.Gateway, dbClient DBClient) (string, error)
	Update(gateway domain.Gateway, dbClient DBClient) error
	Remove(id string, dbClient DBClient) error
}
