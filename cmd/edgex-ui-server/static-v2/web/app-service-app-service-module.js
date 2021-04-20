(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-service-app-service-module"],{

/***/ "2dSq":
/*!******************************************************!*\
  !*** ./src/app/app-service/app-service.component.ts ***!
  \******************************************************/
/*! exports provided: AppServiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServiceComponent", function() { return AppServiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AppServiceComponent {
    constructor() { }
    ngOnInit() {
    }
}
AppServiceComponent.ɵfac = function AppServiceComponent_Factory(t) { return new (t || AppServiceComponent)(); };
AppServiceComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppServiceComponent, selectors: [["app-app-service"]], decls: 2, vars: 0, template: function AppServiceComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "app-service works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAtc2VydmljZS5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppServiceComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-app-service',
                templateUrl: './app-service.component.html',
                styleUrls: ['./app-service.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "VE1N":
/*!***************************************************!*\
  !*** ./src/app/app-service/app-service.module.ts ***!
  \***************************************************/
/*! exports provided: AppServiceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServiceModule", function() { return AppServiceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _app_service_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-service-routing.module */ "sUwf");
/* harmony import */ var _app_service_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-service.component */ "2dSq");





class AppServiceModule {
}
AppServiceModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppServiceModule });
AppServiceModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppServiceModule_Factory(t) { return new (t || AppServiceModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _app_service_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppServiceRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppServiceModule, { declarations: [_app_service_component__WEBPACK_IMPORTED_MODULE_3__["AppServiceComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _app_service_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppServiceRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppServiceModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_app_service_component__WEBPACK_IMPORTED_MODULE_3__["AppServiceComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _app_service_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppServiceRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "sUwf":
/*!***********************************************************!*\
  !*** ./src/app/app-service/app-service-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: AppServiceRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServiceRoutingModule", function() { return AppServiceRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_service_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-service.component */ "2dSq");





const routes = [
    {
        path: '',
        component: _app_service_component__WEBPACK_IMPORTED_MODULE_2__["AppServiceComponent"]
    }
];
class AppServiceRoutingModule {
}
AppServiceRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppServiceRoutingModule });
AppServiceRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppServiceRoutingModule_Factory(t) { return new (t || AppServiceRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppServiceRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppServiceRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=app-service-app-service-module.js.map