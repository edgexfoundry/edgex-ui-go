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
