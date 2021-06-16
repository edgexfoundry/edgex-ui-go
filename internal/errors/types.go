/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
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

package errors

import "fmt"

type ErrParserJsonBody struct {
}

func (e *ErrParserJsonBody) Error() string {
	return fmt.Sprintf("unable parser json body")
}

func NewErrParserJsonBody() error {
	return &ErrParserJsonBody{}
}

type ErrDuplicateName struct {
	name string
}

func (e *ErrDuplicateName) Error() string {
	return e.name
}

func NewErrDuplicateName(name string) error {
	return &ErrDuplicateName{name: name}
}

type ErrResourceNotFound struct {
}

func (e *ErrResourceNotFound) Error() string {
	return fmt.Sprintf("resource not found")
}

func NewErrResourceNotFound() error {
	return &ErrResourceNotFound{}
}

type ErrWriteDatabase struct {
}

func (e *ErrWriteDatabase) Error() string {
	return fmt.Sprintf("write database failed")
}

func NewErrWriteDatabase() error {
	return &ErrWriteDatabase{}
}

type ErrReadDatabase struct {
}

func (e *ErrReadDatabase) Error() string {
	return fmt.Sprintf("read database failed")
}

func NewErrReadDatabase() error {
	return &ErrReadDatabase{}
}
