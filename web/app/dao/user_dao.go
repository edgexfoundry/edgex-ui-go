//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"

type UserDao interface {
	Get(id string, dbClient DBClient) (domain.User, error)
	GetAll(dbClient DBClient) ([]domain.User, error)
	Exists(id string, dbClient DBClient) (bool, error)
	Add(user domain.User, dbClient DBClient) (string, error)
	Update(user domain.User, dbClient DBClient) error
	Remove(id string, dbClient DBClient) error
}
