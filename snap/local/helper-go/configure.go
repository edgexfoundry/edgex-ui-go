/*
 * Copyright (C) 2022 Canonical Ltd
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 * SPDX-License-Identifier: Apache-2.0'
 */

package main

import (
	"github.com/canonical/edgex-snap-hooks/v2/log"
	"github.com/canonical/edgex-snap-hooks/v2/options"
	"github.com/canonical/edgex-snap-hooks/v2/snapctl"
)

// configure is called by the main function
func configure() {
	const app = "edgex-ui"

	log.SetComponentName("configure")

	log.Info("Enabling config options")
	err := snapctl.Set("app-options", "true").Run()
	if err != nil {
		log.Fatalf("Could not enable config options: %v", err)
	}

	log.Info("Processing config options")
	err = options.ProcessConfig(app)
	if err != nil {
		log.Fatalf("Could not process config options: %v", err)
	}

	log.Info("Processing autostart options")
	err = options.ProcessAutostart(app)
	if err != nil {
		log.Fatalf("Could not process autostart options: %v", err)
	}

}
