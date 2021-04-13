(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["core-data-core-data-module"],{

/***/ "Wfku":
/*!**************************************************!*\
  !*** ./src/app/core-data/core-data.component.ts ***!
  \**************************************************/
/*! exports provided: CoreDataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreDataComponent", function() { return CoreDataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CoreDataComponent {
    constructor() { }
    ngOnInit() {
    }
}
CoreDataComponent.ɵfac = function CoreDataComponent_Factory(t) { return new (t || CoreDataComponent)(); };
CoreDataComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CoreDataComponent, selectors: [["app-core-data"]], decls: 2, vars: 0, template: function CoreDataComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "core-data works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb3JlLWRhdGEuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoreDataComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-core-data',
                templateUrl: './core-data.component.html',
                styleUrls: ['./core-data.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "jWsY":
/*!***********************************************!*\
  !*** ./src/app/core-data/core-data.module.ts ***!
  \***********************************************/
/*! exports provided: CoreDataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreDataModule", function() { return CoreDataModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _core_data_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core-data-routing.module */ "mTiL");
/* harmony import */ var _core_data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core-data.component */ "Wfku");





class CoreDataModule {
}
CoreDataModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CoreDataModule });
CoreDataModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CoreDataModule_Factory(t) { return new (t || CoreDataModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _core_data_routing_module__WEBPACK_IMPORTED_MODULE_2__["CoreDataRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoreDataModule, { declarations: [_core_data_component__WEBPACK_IMPORTED_MODULE_3__["CoreDataComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _core_data_routing_module__WEBPACK_IMPORTED_MODULE_2__["CoreDataRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoreDataModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_core_data_component__WEBPACK_IMPORTED_MODULE_3__["CoreDataComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _core_data_routing_module__WEBPACK_IMPORTED_MODULE_2__["CoreDataRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "mTiL":
/*!*******************************************************!*\
  !*** ./src/app/core-data/core-data-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: CoreDataRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreDataRoutingModule", function() { return CoreDataRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _core_data_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core-data.component */ "Wfku");





const routes = [
    {
        path: '',
        component: _core_data_component__WEBPACK_IMPORTED_MODULE_2__["CoreDataComponent"]
    }
];
class CoreDataRoutingModule {
}
CoreDataRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CoreDataRoutingModule });
CoreDataRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CoreDataRoutingModule_Factory(t) { return new (t || CoreDataRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoreDataRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoreDataRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=core-data-core-data-module.js.map