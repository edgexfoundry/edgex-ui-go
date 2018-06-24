//
// Copyright (c) 2018 Tencent
//
// SPDX-License-Identifier: Apache-2.0
//

package app

type UserDao interface {
	Get(id string) (User, error)
	GetAll() ([]User, error)
	Exists(id string) (bool, error)
	Add(user User) (string, error)
	Update(user User) error
	Remove(id string) error
}

type GatewayDao interface {
	Get(id string) (Gateway, error)
	GetAll() ([]Gateway, error)
	Exists(id string) (bool, error)
	Add(gateway Gateway) (string, error)
	Update(gateway Gateway) error
	Remove(id string) error
}

type AddressableDao interface {
	Get(id string) (Addressable, error)
	GetAll() ([]Addressable, error)
	Exists(id string) (bool, error)
	Add(addressable Addressable) (string, error)
	Update(addressable Addressable) error
	Remove(id string) error
}
