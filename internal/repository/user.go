//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package repository

import (
	"github.com/edgexfoundry/edgex-ui-go/internal/domain"
	"github.com/edgexfoundry/edgex-ui-go/internal/repository/mm"
	"github.com/edgexfoundry/edgex-ui-go/internal/repository/mongo"
)

type UserRepos interface {
	Select(id string) (domain.User, error)
	SelectByName(name string) (domain.User, error)
	SelectAll() ([]domain.User, error)
	Exists(id string) (bool, error)
	ExistsUser(user domain.User) (domain.User, error)
	Insert(user domain.User) (string, error)
	Update(user domain.User) error
	Delete(id string) error
}

func GetUserRepos() UserRepos {
	if mongo.DS.S == nil {
		return UserRepos(&mm.UserRepository{})
	} else {
		return UserRepos(&mongo.UserMongoRepository{})
	}
}
