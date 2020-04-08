package errors

import "fmt"

type ErrGatewayAddressInvalid struct {
	address string
}

func (e ErrGatewayAddressInvalid) Error() string{
	return fmt.Sprintf("Address '%s' invalid", e.address)
}

func NewErrGatewayAddressInvalid(address string) error{
	return ErrGatewayAddressInvalid{address:address}
}

type ErrGatewayNameEmpty struct {}

func (e ErrGatewayNameEmpty) Error() string{
	return "name is required for gateway"
}

func NewErrGatewayNameEmpty() error{
	return ErrGatewayNameEmpty{}
}
