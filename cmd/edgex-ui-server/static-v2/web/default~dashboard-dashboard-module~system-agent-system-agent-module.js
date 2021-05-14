(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~dashboard-dashboard-module~system-agent-system-agent-module"],{

/***/ "1ahc":
/*!***********************************************!*\
  !*** ./src/app/services/scheduler.service.ts ***!
  \***********************************************/
/*! exports provided: SchedulerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulerService", function() { return SchedulerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
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






class SchedulerService {
    constructor(http, errorSvc) {
        this.http = http;
        this.errorSvc = errorSvc;
        this.endpoint = "/scheduler";
        this.version = "/api/v2";
        this.urlPrefix = `${this.endpoint}${this.version}`;
        this.configUrl = "/config";
        this.intervalListUrl = `${this.urlPrefix}/interval/all`;
        this.addOneIntervalUrl = `${this.urlPrefix}/interval`;
        this.updateOneIntervalUrl = `${this.urlPrefix}/interval`;
        this.findOneIntervalByNameUrl = `${this.urlPrefix}/interval/name/`;
        this.deleteOneIntervalByNameUrl = `${this.urlPrefix}/interval/name/`;
        this.intervalActionListUrl = `${this.urlPrefix}/intervalaction/all`;
        this.addOneIntervalActionUrl = `${this.urlPrefix}/intervalaction`;
        this.updateOneIntervaActionlUrl = `${this.urlPrefix}/intervalaction`;
        this.findOneIntervalActionByNameUrl = `${this.urlPrefix}/intervalaction/name/`;
        this.deleteOneIntervalActionByNameUrl = `${this.urlPrefix}/intervalaction/name/`;
        this.httpPostOrPutJSONOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-type': 'application/json',
                'Authorization': ''
            })
        };
    }
    getConfig() {
        let url = `${this.urlPrefix}${this.configUrl}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //interval resource
    findAllIntervalsPagination(offset, limit) {
        let url = `${this.intervalListUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    addInterval(interval) {
        let url = `${this.addOneIntervalUrl}`;
        let data = [{
                apiVersion: 'v2',
                interval: interval
            }];
        return this.http.post(url, JSON.stringify(data), this.httpPostOrPutJSONOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateInterval(interval) {
        let url = `${this.updateOneIntervalUrl}`;
        let data = [{
                apiVersion: 'v2',
                interval: interval
            }];
        return this.http.patch(url, JSON.stringify(data), this.httpPostOrPutJSONOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findIntervalByName(name) {
        let url = `${this.findOneIntervalByNameUrl}${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteIntervalByName(name) {
        let url = `${this.deleteOneIntervalByNameUrl}${name}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //interval action resource
    findAllIntervalActionsPagination(offset, limit) {
        let url = `${this.intervalActionListUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    addIntervalAction(intervalAction) {
        let url = `${this.addOneIntervalActionUrl}`;
        let data = [{
                apiVersion: 'v2',
                action: intervalAction
            }];
        return this.http.post(url, JSON.stringify(data), this.httpPostOrPutJSONOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateIntervalAction(intervalAction) {
        let url = `${this.updateOneIntervaActionlUrl}`;
        let data = [{
                apiVersion: 'v2',
                action: intervalAction
            }];
        return this.http.patch(url, JSON.stringify(data), this.httpPostOrPutJSONOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findIntervalActionByName(name) {
        let url = `${this.findOneIntervalActionByNameUrl}${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteIntervalActionByName(name) {
        let url = `${this.deleteOneIntervalActionByNameUrl}${name}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
}
SchedulerService.ɵfac = function SchedulerService_Factory(t) { return new (t || SchedulerService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"])); };
SchedulerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SchedulerService, factory: SchedulerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SchedulerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"] }]; }, null); })();


/***/ }),

/***/ "EnSQ":
/*!******************************************!*\
  !*** ./src/app/services/data.service.ts ***!
  \******************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
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





class DataService {
    constructor(http, errorSvc) {
        this.http = http;
        this.errorSvc = errorSvc;
        this.endpoint = "/coredata";
        this.version = "/api/v2";
        this.urlPrefix = `${this.endpoint}${this.version}`;
        this.configUrl = "/config";
        this.endpointHealthUrl = `${this.urlPrefix}/ping`;
        this.eventCountUrl = `${this.urlPrefix}/event/count`;
        this.readingCountUrl = `${this.urlPrefix}/reading/count`;
    }
    getConfig() {
        let url = `${this.urlPrefix}${this.configUrl}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    endpointHealth() {
        let url = `${this.endpointHealthUrl}`;
        return this.http.get(url);
    }
    eventCount() {
        let url = `${this.eventCountUrl}`;
        return this.http.get(url);
    }
    readingCount() {
        let url = `${this.readingCountUrl}`;
        return this.http.get(url);
    }
    //deprecated
    eventCount1() {
        let url = `${this.eventCountUrl}`;
        return this.http.get(url);
    }
    //deprecated
    readingCount1() {
        let url = `${this.readingCountUrl}`;
        return this.http.get(url);
    }
}
DataService.ɵfac = function DataService_Factory(t) { return new (t || DataService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"])); };
DataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DataService, factory: DataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: _error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"] }]; }, null); })();


/***/ }),

/***/ "KWWs":
/*!***************************************************!*\
  !*** ./src/app/services/notifications.service.ts ***!
  \***************************************************/
/*! exports provided: NotificationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return NotificationsService; });
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






class NotificationsService {
    constructor(http, errorSvc) {
        this.http = http;
        this.errorSvc = errorSvc;
        this.endpoint = "/notification";
        this.version = "/api/v2";
        this.urlPrefix = `${this.endpoint}${this.version}`;
        this.configUrl = "/config";
        //Notification resources
        this.findNotificationByCategoryUrl = `${this.urlPrefix}/notification/category/`;
        this.findNotificationByLabelUrl = `${this.urlPrefix}/notification/label/`;
        this.findNotificationByStatusUrl = `${this.urlPrefix}/notification/status/`;
        this.findNotificationByStartEndUrl = `${this.urlPrefix}/notification/start/`;
        this.deleteNotificationByIdUrl = `${this.urlPrefix}/notification/id/`;
        this.deleteNotificationByAgeAndStatusUrl = `${this.urlPrefix}/notification/age/`; // clean all notification which status must be PROCESSED
        this.cleanupNotificationByAgeUrl = `${this.urlPrefix}/cleanup/age/`; // clean all 
        this.cleanupNotificationAllUrl = `${this.urlPrefix}/cleanup`;
        //Subscription resources 
        this.findAllSubscriptionsPaginationUrl = `${this.urlPrefix}/subscription/all`;
        this.findAllSubscriptionsByCategoryPaginationUrl = `${this.urlPrefix}/subscription/category/`;
        this.findAllSubscriptionsByLabelPaginationUrl = `${this.urlPrefix}/subscription/label/`;
        this.findAllSubscriptionsByReceiverPaginationUrl = `${this.urlPrefix}/subscription/receiver/`;
        this.findOneSubscriptionsByNameUrl = `${this.urlPrefix}/subscription/name/`;
        this.addOneSubscriptionUrl = `${this.urlPrefix}/subscription`;
        this.updateOneSubscriptionUrl = `${this.urlPrefix}/subscription`;
        this.deleteOneSubscriptionByNameUrl = `${this.urlPrefix}/subscription/name/`;
        this.httpPostOrPutOrPatchJSONOptions = {
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
    //Notification resources
    findNotificationsByCategoryPagination(offset, limit, category) {
        let url = `${this.findNotificationByCategoryUrl}${category}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findNotificationsByLabelPagination(offset, limit, label) {
        let url = `${this.findNotificationByLabelUrl}${label}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findNotificationsByStatusPagination(offset, limit, status) {
        let url = `${this.findNotificationByStatusUrl}${status}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findNotificationsByStartEndPagination(offset, limit, start, end) {
        let url = `${this.findNotificationByStartEndUrl}${start}/end/${end}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteNotificationByAgeAndStatus(age) {
        let url = `${this.deleteNotificationByAgeAndStatusUrl}${age}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteNotificationById(id) {
        let url = `${this.deleteNotificationByIdUrl}${id}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    cleanupNotificationByAge(age) {
        let url = `${this.cleanupNotificationByAgeUrl}${age}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    cleanupNotificationAll() {
        let url = `${this.cleanupNotificationAllUrl}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    //subscription resources
    findAllSubscriptionPagination(offset, limit) {
        let url = `${this.findAllSubscriptionsPaginationUrl}?offset=${offset}&limit=${limit}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    findOneSubscriptionByName(name) {
        let url = `${this.findOneSubscriptionsByNameUrl}${name}`;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    addOneSubscription(subscription) {
        let url = `${this.addOneSubscriptionUrl}`;
        let data = [{
                apiVersion: "v2",
                subscription: subscription
            }];
        return this.http.post(url, JSON.stringify(data), this.httpPostOrPutOrPatchJSONOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    updateOneSubscription(subscription) {
        let url = `${this.updateOneSubscriptionUrl}`;
        let data = [{
                apiVersion: "v2",
                subscription: subscription
            }];
        return this.http.patch(url, JSON.stringify(data), this.httpPostOrPutOrPatchJSONOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
    deleteOneSubscriptionByName(name) {
        let url = `${this.deleteOneSubscriptionByNameUrl}${name}`;
        return this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(error => this.errorSvc.handleError(error)));
    }
}
NotificationsService.ɵfac = function NotificationsService_Factory(t) { return new (t || NotificationsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"])); };
NotificationsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NotificationsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }, { type: _error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"] }]; }, null); })();


/***/ }),

/***/ "nBa0":
/*!**************************************************!*\
  !*** ./src/app/services/system-agent.service.ts ***!
  \**************************************************/
/*! exports provided: SystemAgentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemAgentService", function() { return SystemAgentService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../message/message.service */ "hsl2");
/* harmony import */ var _services_command_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/command.service */ "7PPe");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/data.service */ "EnSQ");
/* harmony import */ var _services_metadata_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/metadata.service */ "limL");
/* harmony import */ var _services_scheduler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/scheduler.service */ "1ahc");
/* harmony import */ var _services_notifications_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/notifications.service */ "KWWs");
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










class SystemAgentService {
    constructor(http, msgSvc, cmdSvc, dataService, metadataSvc, schedulerSvc, notiSvc) {
        this.http = http;
        this.msgSvc = msgSvc;
        this.cmdSvc = cmdSvc;
        this.dataService = dataService;
        this.metadataSvc = metadataSvc;
        this.schedulerSvc = schedulerSvc;
        this.notiSvc = notiSvc;
        this.endpoint = "/system";
        this.version1 = "/api/v1";
        this.version2 = "/api/v2";
        this.urlPrefixV1 = `${this.endpoint}${this.version1}`;
        this.urlPrefixV2 = `${this.endpoint}${this.version2}`;
        this.endpointHealthUrl = "/ping";
        this.versionUrl = "/version";
        this.configUrl = "/config/";
        this.metricsUrl = "/metrics/";
        this.healthUrl = "/health/";
        this.operationUrl = "/operation";
        this.httpPostOrPutOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]({
                'Content-type': 'application/json',
                'Authorization': ''
            })
        };
    }
    // defaultServcies = [
    //   "edgex-core-metadata", "edgex-core-data", "edgex-core-command",
    //   "edgex-support-notifications", "edgex-support-scheduler",
    //   "edgex-redis",
    //   "rule-engine",
    //   "edgex-ui-go",
    //   //"edgex-sys-mgmt-agent",
    //   "edgex-app-service-configurable-rules"];
    getConfigV2(service) {
        switch (service) {
            case "edgex-core-data":
                return this.dataService.getConfig().subscribe((resp) => { return resp; });
            case "edgex-core-metadata":
                return this.metadataSvc.getConfig().subscribe((resp) => { return resp; });
            case "edgex-core-command":
                return this.cmdSvc.getConfig().subscribe((resp) => { return resp; });
            case "edgex-support-notifications":
                return this.schedulerSvc.getConfig().subscribe((resp) => { return resp; });
            case "edgex-support-scheduler":
                return this.notiSvc.getConfig().subscribe((resp) => { return resp; });
        }
    }
    //deprecated
    getConfig(services) {
        let url = `${this.urlPrefixV1}${this.configUrl}${services}`;
        return this.http.get(url);
    }
    getMetrics(services) {
        let url = `${this.urlPrefixV1}${this.metricsUrl}${services}`;
        return this.http.get(url);
    }
    getHealth(services) {
        let url = `${this.urlPrefixV1}${this.healthUrl}${services}`;
        return this.http.get(url);
    }
    //action format:
    // {
    //   "action":"stop",
    //   "services":[
    //       "edgex-support-notifications"
    //   ],
    //   "params":[
    //       "graceful"
    //       ]
    //   }
    operate(action) {
        let url = `${this.urlPrefixV1}${this.operationUrl}`;
        return this.http.post(url, JSON.stringify(action), this.httpPostOrPutOptions);
    }
    start(name) {
        let action = {
            "action": "start",
            "services": [name],
            "params": ["graceful"]
        };
        return this.operate(action);
    }
    restart(name) {
        let action = {
            "action": "restart",
            "services": [name],
            "params": ["graceful"]
        };
        return this.operate(action);
    }
    stop(name) {
        let action = {
            "action": "stop",
            "services": [name],
            "params": ["graceful"]
        };
        return this.operate(action);
    }
}
SystemAgentService.ɵfac = function SystemAgentService_Factory(t) { return new (t || SystemAgentService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_command_service__WEBPACK_IMPORTED_MODULE_3__["CommandService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_metadata_service__WEBPACK_IMPORTED_MODULE_5__["MetadataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_scheduler_service__WEBPACK_IMPORTED_MODULE_6__["SchedulerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_notifications_service__WEBPACK_IMPORTED_MODULE_7__["NotificationsService"])); };
SystemAgentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SystemAgentService, factory: SystemAgentService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SystemAgentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }, { type: _message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"] }, { type: _services_command_service__WEBPACK_IMPORTED_MODULE_3__["CommandService"] }, { type: _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"] }, { type: _services_metadata_service__WEBPACK_IMPORTED_MODULE_5__["MetadataService"] }, { type: _services_scheduler_service__WEBPACK_IMPORTED_MODULE_6__["SchedulerService"] }, { type: _services_notifications_service__WEBPACK_IMPORTED_MODULE_7__["NotificationsService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=default~dashboard-dashboard-module~system-agent-system-agent-module.js.map