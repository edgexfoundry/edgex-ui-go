package errors

import "fmt"

type ErrGatewayAddressInvalid struct {
	address string
}

func (e *ErrGatewayAddressInvalid) Error() string {
	return fmt.Sprintf("Address '%s' invalid", e.address)
}

func NewErrGatewayAddressInvalid(address string) error {
	return &ErrGatewayAddressInvalid{address: address}
}

type ErrGatewayNameEmpty struct{}

func (e *ErrGatewayNameEmpty) Error() string {
	return "name is required for gateway"
}

func NewErrGatewayNameEmpty() error {
	return &ErrGatewayNameEmpty{}
}

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
