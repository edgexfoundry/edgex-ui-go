/*******************************************************************************
 * Copyright © 2018-2020 VMware, Inc. All Rights Reserved.
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
 *******************************************************************************/

package configs

import (
	"github.com/pelletier/go-toml"
	"os"
	"reflect"
	"strconv"
	"strings"
)

type environment struct {
	env map[string]interface{}
}

func NewEnvironment() *environment {
	osEnv := os.Environ()
	e := &environment{
		env: make(map[string]interface{}, len(osEnv)),
	}
	for _, e1 := range osEnv {
		kv := strings.Split(e1, "=")
		if len(kv) == 2 && len(kv[0]) > 0 && len(kv[1]) > 0 {
			e.env[kv[0]] = kv[1]
		}
	}
	return e
}

func (e *environment) OverrideFromEnvironment(tree *toml.Tree) (*toml.Tree, error) {
	for k, v := range e.env {
		k = strings.Replace(k, "_", ".", -1)
		if tree.Has(k) {
			// global key
			realType := reflect.TypeOf(tree.Get(k)).Kind()
			switch realType {
			case reflect.Int64:
				v, err := strconv.ParseInt(v.(string), 10, 64)
				if err != nil {
					return nil, err
				}
				tree.Set(k, v)
				break
			case reflect.Int:
				v, err := strconv.Atoi(v.(string))
				if err != nil {
					return nil, err
				}
				tree.Set(k, v)
				break
			default:
				tree.Set(k, v)
			}
		}
	}
	return tree, nil
}
