(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~metadata-metadata-module~system-agent-system-agent-module"],{

/***/ "7PPe":
/*!*********************************************!*\
  !*** ./src/app/services/command.service.ts ***!
  \*********************************************/
/*! exports provided: CommandService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandService", function() { return CommandService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error.service */ "9vc0");
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






class CommandService {
    constructor(http, errorSvc) {
        this.http = http;
        this.errorSvc = errorSvc;
        this.endpoint = "/command";
        this.version = "/api/v2";
        this.urlPrefix = `${this.endpoint}${this.version}`;
        this.endpointHealthUrl = "/ping";
        this.versionUrl = "/version";
        this.configUrl = "/config";
        this.deviceCoreCommandListUrl = `${this.urlPrefix}/device/all`;
        this.commandsByDeviceIdUrl = `${this.urlPrefix}/device/`; //deprecated
        this.commandsByDeviceNameUrl = `${this.urlPrefix}/device/name/`;
        this.issueCmdByDeviceNameAndCmdNameUrl = `${this.urlPrefix}/device/name/`;
        this.httpPostOrPutOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-type': 'application/json',
                'Authorization': ''
            })
        };
    }
    getConfig() {
        let url = `${this.urlPrefix}${this.configUrl}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findCommnadsByDeviceId(deviceId) {
        let url = `${this.commandsByDeviceIdUrl}${deviceId}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    allDeviceCoreCommandsPagination(offset, limit) {
        let url = `${this.deviceCoreCommandListUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findDeviceAssociatedCommnadsByDeviceName(name) {
        let url = `${this.commandsByDeviceNameUrl}${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findAllDeviceCommnads() {
        let url = `${this.urlPrefix}/device`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    issueGetBinaryCmd(deviceId, commandId) {
        let url = `${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
        return this.http.request('GET', url, {
            responseType: 'arraybuffer'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    issueGetCmd(deviceName, commandName) {
        let url = `${this.issueCmdByDeviceNameAndCmdNameUrl}${deviceName}/${commandName}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    // issueGetCmd(deviceId: string, commandId: string): Observable<any> {
    //   let url = `${this.urlPrefix}${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
    //   return this.http.get(url).pipe(
    //     catchError(error => this.errorSvc.handleError(error))
    //   )
    // }
    issueSetCmd(deviceId, commandId, params) {
        let url = `${this.commandsByDeviceIdUrl}${deviceId}/command/${commandId}`;
        return this.http.request('PUT', url, {
            body: JSON.stringify(params),
            responseType: 'text'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
}
CommandService.ɵfac = function CommandService_Factory(t) { return new (t || CommandService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"])); };
CommandService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CommandService, factory: CommandService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CommandService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }, { type: _error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"] }]; }, null); })();


/***/ }),

/***/ "9vc0":
/*!*******************************************!*\
  !*** ./src/app/services/error.service.ts ***!
  \*******************************************/
/*! exports provided: ErrorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorService", function() { return ErrorService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../message/message.service */ "hsl2");
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




class ErrorService {
    constructor(msgSvc) {
        this.msgSvc = msgSvc;
    }
    handleErrorForV2API(data) {
        let t = Object.prototype.toString.call(data);
        if (t === '[object Array]') {
            if (!data[0].statusCode.toString().startsWith('20')) {
                this.msgSvc.errors(`code: ${data[0].statusCode}, message: ${data[0].message}`);
                return true;
            }
        }
        else if (t === '[object Object]') {
            if (!data.statusCode.toString().startsWith('20')) {
                this.msgSvc.errors(`code: ${data.statusCode}, message: ${data.message}`);
                return true;
            }
        }
        return false;
    }
    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            this.msgSvc.errors(`'An error occurred:', ${error.error.message}`);
        }
        else {
            if (Object.prototype.toString.call(error.error) === '[object Object]') {
                this.msgSvc.errors(`code: ${error.error.statusCode} , message: ${error.error.message}`);
            }
            else {
                this.msgSvc.errors(`code: ${error.status} , message: ${error.message}`);
            }
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(`Backend returned code ${error.error.statusCode}, ` +
            `body was: ${error.error.message}`);
    }
}
ErrorService.ɵfac = function ErrorService_Factory(t) { return new (t || ErrorService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"])); };
ErrorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ErrorService, factory: ErrorService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ErrorService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"] }]; }, null); })();


/***/ }),

/***/ "limL":
/*!**********************************************!*\
  !*** ./src/app/services/metadata.service.ts ***!
  \**********************************************/
/*! exports provided: MetadataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetadataService", function() { return MetadataService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error.service */ "9vc0");
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






class MetadataService {
    constructor(http, errorSvc) {
        this.http = http;
        this.errorSvc = errorSvc;
        this.endpoint = "/metadata";
        this.version = "/api/v2";
        this.urlPrefix = `${this.endpoint}${this.version}`;
        this.configUrl = "/config";
        this.devicesListUrl = `${this.urlPrefix}/device/all`;
        this.addOneDeviceUrl = `${this.urlPrefix}/device`;
        this.updateOneDeviceUrl = `${this.urlPrefix}/device`;
        this.deleteOneDeviceByIdUrl = `${this.urlPrefix}/device/Id/`;
        this.deleteOneDeviceByNameUrl = `${this.urlPrefix}/device/name/`;
        this.findDeviceByNameUrl = `${this.urlPrefix}/device/name/`;
        this.findDeviceByIdUrl = `${this.urlPrefix}/device/id/`;
        this.findDevicesByServiceIdUrl = `${this.urlPrefix}/device/service/id/`;
        this.findDevicesByServiceNameUrl = `${this.urlPrefix}/device/service/name/`;
        this.findDevicesByProfileIdUrl = `${this.urlPrefix}/device/profile/id/`;
        this.findDevicesByProfileNameUrl = `${this.urlPrefix}/device/profile/name/`;
        this.deviceServicesListUrl = `${this.urlPrefix}/deviceservice/all`;
        this.updateDeviceServiceUrl = `${this.urlPrefix}/deviceservice`;
        this.findDeviceServiceByIdUrl = `${this.urlPrefix}/deviceservice/id/`;
        this.findDeviceServiceByNameUrl = `${this.urlPrefix}/deviceservice/name/`;
        this.deviceProfilesListUrl = `${this.urlPrefix}/deviceprofile/all`;
        this.findProfilesByIdUrl = `${this.urlPrefix}/deviceprofile`;
        this.findProfilesByNameUrl = `${this.urlPrefix}/deviceprofile/name/`;
        this.updateDeviceProfileUrl = `${this.urlPrefix}/deviceprofile`;
        this.uploadProfileYamlFileUrl = `${this.urlPrefix}/deviceprofile/uploadfile`;
        this.uploadProfileYamlContentUrl = `${this.urlPrefix}/deviceprofile/upload`;
        this.deviceProfileYamlUrl = `${this.urlPrefix}/deviceprofile/yaml/`;
        this.deleteProfileByIdUrl = `${this.urlPrefix}/deviceprofile/id/`;
        this.deleteProfileByNamedUrl = `${this.urlPrefix}/deviceprofile/name/`;
        this.httpPostOrPutJSONOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-type': 'application/json',
                'Authorization': ''
            })
        };
    }
    getConfig() {
        let url = `${this.urlPrefix}${this.configUrl}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //Device resources
    allDevices() {
        let url = `${this.devicesListUrl}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    allDevicesPagination(offset, limit) {
        let url = `${this.devicesListUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    addDevice(device) {
        let url = `${this.addOneDeviceUrl}`;
        device.apiVersion = 'v2';
        let data = [{
                apiVersion: "v2",
                device: device
            }];
        return this.http.post(url, JSON.stringify(data), this.httpPostOrPutJSONOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteOneDeviceByName(name) {
        let url = `${this.deleteOneDeviceByNameUrl}${name}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    deleteOneDeviceById(id) {
        let url = `${this.deleteOneDeviceByIdUrl}${id}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateDevice(device) {
        let url = `${this.updateOneDeviceUrl}`;
        let data = [{
                apiVersion: "v2",
                device: device
            }];
        return this.http.patch(url, JSON.stringify(data), {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-type': 'application/json'
            })
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
        // return this.http.patch<BaseResponse>(url, {
        //   body: JSON.stringify(data),
        //   responseType: 'json',
        //   headers: new HttpHeaders({
        //     'Content-type': 'application/json'
        //   })
        // }).pipe(
        //   catchError(error => this.errorSvc.handleError(error))
        // )
    }
    findDeviceByName(name) {
        let url = `${this.findDeviceByNameUrl}/${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findDeviceById(id) {
        let url = `${this.findDeviceByIdUrl}/${id}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findDevicesByServiceId(serviceId) {
        let url = `${this.findDevicesByServiceIdUrl}${serviceId}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findDevicesByServiceName(serviceName) {
        let url = `${this.findDevicesByServiceNameUrl}${serviceName}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findDevicesByProfileId(profileId) {
        let url = `${this.findDevicesByProfileIdUrl}/${profileId}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findDevicesByProfileName(profileName) {
        let url = `${this.findDevicesByProfileNameUrl}${profileName}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //Device Service resources
    allDeviceServices() {
        let url = `${this.deviceServicesListUrl}?offset=${0}&limit=${-1}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findAllDeviceServicesPagination(offset, limit) {
        let url = `${this.deviceServicesListUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateDeviceService(deviceService) {
        let url = `${this.updateDeviceServiceUrl}`;
        let data = [{
                apiVersion: "v2",
                service: deviceService
            }];
        return this.http.patch(url, JSON.stringify(data), this.httpPostOrPutJSONOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findDevcieServiceById(id) {
        let url = `${this.findDeviceServiceByIdUrl}${id}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findDevcieServiceByName(name) {
        let url = `${this.findDeviceServiceByNameUrl}${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //Device Profile resources
    allDeviceProfoles() {
        let url = `${this.deviceProfilesListUrl}?offset=${0}&limit=${-1}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    allDeviceProfolesPagination(offset, limit) {
        let url = `${this.deviceProfilesListUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    addProfileYamlByNameViaUIBackend(data) {
        let url = "/api/v1/profile/yaml";
        return this.http.request('POST', url, {
            body: data,
            responseType: 'text'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findProfileById(id) {
        let url = `${this.findProfilesByIdUrl}/${id}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findProfileByName(name) {
        let url = `${this.findProfilesByNameUrl}/${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findProfileYamlByNameViaUIBackend(name) {
        let url = "/api/v1/profile/yaml/name/" + name;
        return this.http.request('GET', url, {
            responseType: 'text'
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    uploadProfileYamlFile(data) {
        let url = `${this.uploadProfileYamlFileUrl}`;
        return this.http.request('POST', url, {
            body: data,
            responseType: 'text',
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateDeviceProfile(profile) {
        let url = `${this.updateDeviceProfileUrl}`;
        return this.http.put(url, profile, this.httpPostOrPutJSONOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateProfileYamlContentViaUIBackend(data) {
        let url = "/api/v1/profile/yaml";
        return this.http.put(url, data, {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-Type': 'text/plain; charset=utf-8'
            })
        });
        // return this.http.request('PUT', url, {
        //   body: data,
        //   responseType: 'json',
        //   headers: new HttpHeaders({
        //     'Content-Type': 'text/plain; charset=utf-8'
        //   })
        // }).pipe(
        //   catchError(error => this.errorSvc.handleError(error))
        // )
    }
    //deprecated
    uploadProfileYamlContent(data) {
        let url = `${this.uploadProfileYamlContentUrl}`;
        return this.http.request('POST', url, {
            body: data,
            responseType: 'text',
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-Type': 'text/plain; charset=utf-8'
            })
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //deprecated
    findProfileYamlById(id) {
        let url = `${this.deviceProfileYamlUrl}${id}`;
        return this.http.request('GET', url, { responseType: 'text' });
    }
    //deprecated
    deleteProfileById(id) {
        let url = `${this.deleteProfileByIdUrl}${id}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteProfileByName(name) {
        let url = `${this.deleteProfileByNamedUrl}${name}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
}
MetadataService.ɵfac = function MetadataService_Factory(t) { return new (t || MetadataService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"])); };
MetadataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MetadataService, factory: MetadataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MetadataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }, { type: _error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~metadata-metadata-module~system-agent-system-agent-module.js.map