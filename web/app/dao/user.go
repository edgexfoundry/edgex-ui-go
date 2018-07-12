//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"

type UserDao interface {
	Get(id string) (domain.User, error)
	GetAll() ([]domain.User, error)
	Exists(id string) (bool, error)
	Add(user domain.User) (string, error)
	Update(user domain.User) error
	Remove(id string) error
}
