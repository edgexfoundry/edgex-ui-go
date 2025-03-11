// Code generated by go-swagger; DO NOT EDIT.

//
// Copyright NetFoundry Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// __          __              _
// \ \        / /             (_)
//  \ \  /\  / /_ _ _ __ _ __  _ _ __   __ _
//   \ \/  \/ / _` | '__| '_ \| | '_ \ / _` |
//    \  /\  / (_| | |  | | | | | | | | (_| | : This file is generated, do not edit it.
//     \/  \/ \__,_|_|  |_| |_|_|_| |_|\__, |
//                                      __/ |
//                                     |___/

package service_policy

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/openziti/edge-api/rest_model"
)

// UpdateServicePolicyReader is a Reader for the UpdateServicePolicy structure.
type UpdateServicePolicyReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *UpdateServicePolicyReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewUpdateServicePolicyOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewUpdateServicePolicyBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewUpdateServicePolicyUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 404:
		result := NewUpdateServicePolicyNotFound()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 429:
		result := NewUpdateServicePolicyTooManyRequests()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 503:
		result := NewUpdateServicePolicyServiceUnavailable()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewUpdateServicePolicyOK creates a UpdateServicePolicyOK with default headers values
func NewUpdateServicePolicyOK() *UpdateServicePolicyOK {
	return &UpdateServicePolicyOK{}
}

/* UpdateServicePolicyOK describes a response with status code 200, with default header values.

The update request was successful and the resource has been altered
*/
type UpdateServicePolicyOK struct {
	Payload *rest_model.Empty
}

func (o *UpdateServicePolicyOK) Error() string {
	return fmt.Sprintf("[PUT /service-policies/{id}][%d] updateServicePolicyOK  %+v", 200, o.Payload)
}
func (o *UpdateServicePolicyOK) GetPayload() *rest_model.Empty {
	return o.Payload
}

func (o *UpdateServicePolicyOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(rest_model.Empty)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewUpdateServicePolicyBadRequest creates a UpdateServicePolicyBadRequest with default headers values
func NewUpdateServicePolicyBadRequest() *UpdateServicePolicyBadRequest {
	return &UpdateServicePolicyBadRequest{}
}

/* UpdateServicePolicyBadRequest describes a response with status code 400, with default header values.

The supplied request contains invalid fields or could not be parsed (json and non-json bodies). The error's code, message, and cause fields can be inspected for further information
*/
type UpdateServicePolicyBadRequest struct {
	Payload *rest_model.APIErrorEnvelope
}

func (o *UpdateServicePolicyBadRequest) Error() string {
	return fmt.Sprintf("[PUT /service-policies/{id}][%d] updateServicePolicyBadRequest  %+v", 400, o.Payload)
}
func (o *UpdateServicePolicyBadRequest) GetPayload() *rest_model.APIErrorEnvelope {
	return o.Payload
}

func (o *UpdateServicePolicyBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(rest_model.APIErrorEnvelope)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewUpdateServicePolicyUnauthorized creates a UpdateServicePolicyUnauthorized with default headers values
func NewUpdateServicePolicyUnauthorized() *UpdateServicePolicyUnauthorized {
	return &UpdateServicePolicyUnauthorized{}
}

/* UpdateServicePolicyUnauthorized describes a response with status code 401, with default header values.

The supplied session does not have the correct access rights to request this resource
*/
type UpdateServicePolicyUnauthorized struct {
	Payload *rest_model.APIErrorEnvelope
}

func (o *UpdateServicePolicyUnauthorized) Error() string {
	return fmt.Sprintf("[PUT /service-policies/{id}][%d] updateServicePolicyUnauthorized  %+v", 401, o.Payload)
}
func (o *UpdateServicePolicyUnauthorized) GetPayload() *rest_model.APIErrorEnvelope {
	return o.Payload
}

func (o *UpdateServicePolicyUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(rest_model.APIErrorEnvelope)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewUpdateServicePolicyNotFound creates a UpdateServicePolicyNotFound with default headers values
func NewUpdateServicePolicyNotFound() *UpdateServicePolicyNotFound {
	return &UpdateServicePolicyNotFound{}
}

/* UpdateServicePolicyNotFound describes a response with status code 404, with default header values.

The requested resource does not exist
*/
type UpdateServicePolicyNotFound struct {
	Payload *rest_model.APIErrorEnvelope
}

func (o *UpdateServicePolicyNotFound) Error() string {
	return fmt.Sprintf("[PUT /service-policies/{id}][%d] updateServicePolicyNotFound  %+v", 404, o.Payload)
}
func (o *UpdateServicePolicyNotFound) GetPayload() *rest_model.APIErrorEnvelope {
	return o.Payload
}

func (o *UpdateServicePolicyNotFound) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(rest_model.APIErrorEnvelope)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewUpdateServicePolicyTooManyRequests creates a UpdateServicePolicyTooManyRequests with default headers values
func NewUpdateServicePolicyTooManyRequests() *UpdateServicePolicyTooManyRequests {
	return &UpdateServicePolicyTooManyRequests{}
}

/* UpdateServicePolicyTooManyRequests describes a response with status code 429, with default header values.

The resource requested is rate limited and the rate limit has been exceeded
*/
type UpdateServicePolicyTooManyRequests struct {
	Payload *rest_model.APIErrorEnvelope
}

func (o *UpdateServicePolicyTooManyRequests) Error() string {
	return fmt.Sprintf("[PUT /service-policies/{id}][%d] updateServicePolicyTooManyRequests  %+v", 429, o.Payload)
}
func (o *UpdateServicePolicyTooManyRequests) GetPayload() *rest_model.APIErrorEnvelope {
	return o.Payload
}

func (o *UpdateServicePolicyTooManyRequests) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(rest_model.APIErrorEnvelope)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewUpdateServicePolicyServiceUnavailable creates a UpdateServicePolicyServiceUnavailable with default headers values
func NewUpdateServicePolicyServiceUnavailable() *UpdateServicePolicyServiceUnavailable {
	return &UpdateServicePolicyServiceUnavailable{}
}

/* UpdateServicePolicyServiceUnavailable describes a response with status code 503, with default header values.

The request could not be completed due to the server being busy or in a temporarily bad state
*/
type UpdateServicePolicyServiceUnavailable struct {
	Payload *rest_model.APIErrorEnvelope
}

func (o *UpdateServicePolicyServiceUnavailable) Error() string {
	return fmt.Sprintf("[PUT /service-policies/{id}][%d] updateServicePolicyServiceUnavailable  %+v", 503, o.Payload)
}
func (o *UpdateServicePolicyServiceUnavailable) GetPayload() *rest_model.APIErrorEnvelope {
	return o.Payload
}

func (o *UpdateServicePolicyServiceUnavailable) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(rest_model.APIErrorEnvelope)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
