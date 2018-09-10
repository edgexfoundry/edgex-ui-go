/*******************************************************************************
 * Copyright © 2017-2018 VMware, Inc. All Rights Reserved.
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

package controller

import (
	"io/ioutil"
	"net/http"
	"path/filepath"
	"github.com/edgexfoundry/edgex-ui-go/configs"
	"github.com/edgexfoundry/edgex-ui-go/web/app/common"
)

const (
	TemplateDirName     = "templates"
	ProfileTemplateName = "profileTemplate.yml"
)

func DowloadProfile(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	relativeTemplateFilePath := filepath.Join(common.RelativePathToProjectRoot, configs.WebDirName, TemplateDirName, ProfileTemplateName)
	data, err := ioutil.ReadFile(relativeTemplateFilePath)

	if err == nil {
		contentType := "application/x-yaml;charset=UTF-8"
		w.Header().Set("Content-Type", contentType)
		w.Header().Set("Content-disposition", "attachment;filename=\""+ProfileTemplateName+"\"")
		w.Write(data)
	} else {
		w.WriteHeader(404)
		w.Write([]byte("404 download failure!"))
	}
}
