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

package edge_router_policy

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

// NewPatchEdgeRouterPolicyParams creates a new PatchEdgeRouterPolicyParams object,
// with the default timeout for this client.
//
// Default values are not hydrated, since defaults are normally applied by the API server side.
//
// To enforce default values in parameter, use SetDefaults or WithDefaults.
func NewPatchEdgeRouterPolicyParams() *PatchEdgeRouterPolicyParams {
	return &PatchEdgeRouterPolicyParams{
		timeout: cr.DefaultTimeout,
	}
}

// NewPatchEdgeRouterPolicyParamsWithTimeout creates a new PatchEdgeRouterPolicyParams object
// with the ability to set a timeout on a request.
func NewPatchEdgeRouterPolicyParamsWithTimeout(timeout time.Duration) *PatchEdgeRouterPolicyParams {
	return &PatchEdgeRouterPolicyParams{
		timeout: timeout,
	}
}

// NewPatchEdgeRouterPolicyParamsWithContext creates a new PatchEdgeRouterPolicyParams object
// with the ability to set a context for a request.
func NewPatchEdgeRouterPolicyParamsWithContext(ctx context.Context) *PatchEdgeRouterPolicyParams {
	return &PatchEdgeRouterPolicyParams{
		Context: ctx,
	}
}

// NewPatchEdgeRouterPolicyParamsWithHTTPClient creates a new PatchEdgeRouterPolicyParams object
// with the ability to set a custom HTTPClient for a request.
func NewPatchEdgeRouterPolicyParamsWithHTTPClient(client *http.Client) *PatchEdgeRouterPolicyParams {
	return &PatchEdgeRouterPolicyParams{
		HTTPClient: client,
	}
}

/* PatchEdgeRouterPolicyParams contains all the parameters to send to the API endpoint
   for the patch edge router policy operation.

   Typically these are written to a http.Request.
*/
type PatchEdgeRouterPolicyParams struct {

	/* ID.

	   The id of the requested resource
	*/
	ID string

	/* Policy.

	   An edge router policy patch object
	*/
	Policy *rest_model.EdgeRouterPolicyPatch

	timeout    time.Duration
	Context    context.Context
	HTTPClient *http.Client
}

// WithDefaults hydrates default values in the patch edge router policy params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *PatchEdgeRouterPolicyParams) WithDefaults() *PatchEdgeRouterPolicyParams {
	o.SetDefaults()
	return o
}

// SetDefaults hydrates default values in the patch edge router policy params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *PatchEdgeRouterPolicyParams) SetDefaults() {
	// no default values defined for this parameter
}

// WithTimeout adds the timeout to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) WithTimeout(timeout time.Duration) *PatchEdgeRouterPolicyParams {
	o.SetTimeout(timeout)
	return o
}

// SetTimeout adds the timeout to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) SetTimeout(timeout time.Duration) {
	o.timeout = timeout
}

// WithContext adds the context to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) WithContext(ctx context.Context) *PatchEdgeRouterPolicyParams {
	o.SetContext(ctx)
	return o
}

// SetContext adds the context to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) SetContext(ctx context.Context) {
	o.Context = ctx
}

// WithHTTPClient adds the HTTPClient to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) WithHTTPClient(client *http.Client) *PatchEdgeRouterPolicyParams {
	o.SetHTTPClient(client)
	return o
}

// SetHTTPClient adds the HTTPClient to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) SetHTTPClient(client *http.Client) {
	o.HTTPClient = client
}

// WithID adds the id to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) WithID(id string) *PatchEdgeRouterPolicyParams {
	o.SetID(id)
	return o
}

// SetID adds the id to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) SetID(id string) {
	o.ID = id
}

// WithPolicy adds the policy to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) WithPolicy(policy *rest_model.EdgeRouterPolicyPatch) *PatchEdgeRouterPolicyParams {
	o.SetPolicy(policy)
	return o
}

// SetPolicy adds the policy to the patch edge router policy params
func (o *PatchEdgeRouterPolicyParams) SetPolicy(policy *rest_model.EdgeRouterPolicyPatch) {
	o.Policy = policy
}

// WriteToRequest writes these params to a swagger request
func (o *PatchEdgeRouterPolicyParams) WriteToRequest(r runtime.ClientRequest, reg strfmt.Registry) error {

	if err := r.SetTimeout(o.timeout); err != nil {
		return err
	}
	var res []error

	// path param id
	if err := r.SetPathParam("id", o.ID); err != nil {
		return err
	}
	if o.Policy != nil {
		if err := r.SetBodyParam(o.Policy); err != nil {
			return err
		}
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
