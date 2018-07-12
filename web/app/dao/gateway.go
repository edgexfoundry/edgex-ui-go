//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package dao

import "github.com/edgexfoundry-holding/edgex-ui-go/web/app/domain"

type GatewayDao interface {
	Get(id string) (domain.Gateway, error)
	GetAll() ([]domain.Gateway, error)
	Exists(id string) (bool, error)
	Add(gateway domain.Gateway) (string, error)
	Update(gateway domain.Gateway) error
	Remove(id string) error
}
