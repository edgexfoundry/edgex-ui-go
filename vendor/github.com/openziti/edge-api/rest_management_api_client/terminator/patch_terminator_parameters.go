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

package terminator

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"net/http"
	"time"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	cr "github.com/go-openapi/runtime/client"
	"github.com/go-openapi/strfmt"

	"github.com/openziti/edge-api/rest_model"
)

// NewPatchTerminatorParams creates a new PatchTerminatorParams object,
// with the default timeout for this client.
//
// Default values are not hydrated, since defaults are normally applied by the API server side.
//
// To enforce default values in parameter, use SetDefaults or WithDefaults.
func NewPatchTerminatorParams() *PatchTerminatorParams {
	return &PatchTerminatorParams{
		timeout: cr.DefaultTimeout,
	}
}

// NewPatchTerminatorParamsWithTimeout creates a new PatchTerminatorParams object
// with the ability to set a timeout on a request.
func NewPatchTerminatorParamsWithTimeout(timeout time.Duration) *PatchTerminatorParams {
	return &PatchTerminatorParams{
		timeout: timeout,
	}
}

// NewPatchTerminatorParamsWithContext creates a new PatchTerminatorParams object
// with the ability to set a context for a request.
func NewPatchTerminatorParamsWithContext(ctx context.Context) *PatchTerminatorParams {
	return &PatchTerminatorParams{
		Context: ctx,
	}
}

// NewPatchTerminatorParamsWithHTTPClient creates a new PatchTerminatorParams object
// with the ability to set a custom HTTPClient for a request.
func NewPatchTerminatorParamsWithHTTPClient(client *http.Client) *PatchTerminatorParams {
	return &PatchTerminatorParams{
		HTTPClient: client,
	}
}

/* PatchTerminatorParams contains all the parameters to send to the API endpoint
   for the patch terminator operation.

   Typically these are written to a http.Request.
*/
type PatchTerminatorParams struct {

	/* ID.

	   The id of the requested resource
	*/
	ID string

	/* Terminator.

	   A terminator patch object
	*/
	Terminator *rest_model.TerminatorPatch

	timeout    time.Duration
	Context    context.Context
	HTTPClient *http.Client
}

// WithDefaults hydrates default values in the patch terminator params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *PatchTerminatorParams) WithDefaults() *PatchTerminatorParams {
	o.SetDefaults()
	return o
}

// SetDefaults hydrates default values in the patch terminator params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *PatchTerminatorParams) SetDefaults() {
	// no default values defined for this parameter
}

// WithTimeout adds the timeout to the patch terminator params
func (o *PatchTerminatorParams) WithTimeout(timeout time.Duration) *PatchTerminatorParams {
	o.SetTimeout(timeout)
	return o
}

// SetTimeout adds the timeout to the patch terminator params
func (o *PatchTerminatorParams) SetTimeout(timeout time.Duration) {
	o.timeout = timeout
}

// WithContext adds the context to the patch terminator params
func (o *PatchTerminatorParams) WithContext(ctx context.Context) *PatchTerminatorParams {
	o.SetContext(ctx)
	return o
}

// SetContext adds the context to the patch terminator params
func (o *PatchTerminatorParams) SetContext(ctx context.Context) {
	o.Context = ctx
}

// WithHTTPClient adds the HTTPClient to the patch terminator params
func (o *PatchTerminatorParams) WithHTTPClient(client *http.Client) *PatchTerminatorParams {
	o.SetHTTPClient(client)
	return o
}

// SetHTTPClient adds the HTTPClient to the patch terminator params
func (o *PatchTerminatorParams) SetHTTPClient(client *http.Client) {
	o.HTTPClient = client
}

// WithID adds the id to the patch terminator params
func (o *PatchTerminatorParams) WithID(id string) *PatchTerminatorParams {
	o.SetID(id)
	return o
}

// SetID adds the id to the patch terminator params
func (o *PatchTerminatorParams) SetID(id string) {
	o.ID = id
}

// WithTerminator adds the terminator to the patch terminator params
func (o *PatchTerminatorParams) WithTerminator(terminator *rest_model.TerminatorPatch) *PatchTerminatorParams {
	o.SetTerminator(terminator)
	return o
}

// SetTerminator adds the terminator to the patch terminator params
func (o *PatchTerminatorParams) SetTerminator(terminator *rest_model.TerminatorPatch) {
	o.Terminator = terminator
}

// WriteToRequest writes these params to a swagger request
func (o *PatchTerminatorParams) WriteToRequest(r runtime.ClientRequest, reg strfmt.Registry) error {

	if err := r.SetTimeout(o.timeout); err != nil {
		return err
	}
	var res []error

	// path param id
	if err := r.SetPathParam("id", o.ID); err != nil {
		return err
	}
	if o.Terminator != nil {
		if err := r.SetBodyParam(o.Terminator); err != nil {
			return err
		}
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
