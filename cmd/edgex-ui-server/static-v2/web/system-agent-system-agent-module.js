(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["system-agent-system-agent-module"],{

/***/ "5X28":
/*!*********************************************************!*\
  !*** ./src/app/system-agent/config/config.component.ts ***!
  \*********************************************************/
/*! exports provided: ConfigComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigComponent", function() { return ConfigComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_system_agent_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/system-agent.service */ "nBa0");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function ConfigComponent_pre_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pre");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.config);
} }
class ConfigComponent {
    constructor(sysService, route) {
        this.sysService = sysService;
        this.route = route;
    }
    ngOnInit() {
        this.service = this.route.snapshot.paramMap.get('name');
        this.getConfigs();
    }
    getConfigs() {
        this.sysService.getConfig(this.service).subscribe((data) => {
            this.config = JSON.stringify(data, null, 3);
        });
    }
}
ConfigComponent.ɵfac = function ConfigComponent_Factory(t) { return new (t || ConfigComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_system_agent_service__WEBPACK_IMPORTED_MODULE_1__["SystemAgentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"])); };
ConfigComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConfigComponent, selectors: [["app-config"]], decls: 7, vars: 1, consts: [[1, "card"], [1, "card-header"], [1, "fa", "fa-file-text"], [1, "card-body"], [4, "ngIf"]], template: function ConfigComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Config Inspect");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ConfigComponent_pre_6_Template, 2, 1, "pre", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.config);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25maWcuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConfigComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-config',
                templateUrl: './config.component.html',
                styleUrls: ['./config.component.css']
            }]
    }], function () { return [{ type: _services_system_agent_service__WEBPACK_IMPORTED_MODULE_1__["SystemAgentService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "F5u4":
/*!***********************************************************!*\
  !*** ./src/app/system-agent/metrics/metrics.component.ts ***!
  \***********************************************************/
/*! exports provided: MetricsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricsComponent", function() { return MetricsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_system_agent_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/system-agent.service */ "nBa0");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");






function MetricsComponent_span_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.metrics.executor);
} }
function MetricsComponent_span_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r1.metrics.result.raw.mem_usage, " ");
} }
function MetricsComponent_span_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r2.metrics.result.cpuUsedPercent, "%");
} }
function MetricsComponent_span_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.metrics.result.raw.net_io);
} }
class MetricsComponent {
    constructor(route, router, sysService) {
        this.route = route;
        this.router = router;
        this.sysService = sysService;
        this.refreshRate = 3;
        this.option = {
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: '{c0}%'
            },
            legend: {
                data: [""]
            },
            dateZoom: {
                show: false,
                start: 0,
                end: 100,
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }
            ],
            series: [
                {
                    "name": "",
                    "type": "line",
                    "smooth": true,
                    "itemStyle": { normal: { color: "#425CC7", areaStyle: { type: "default" } } },
                    "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
        this.netChartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#922C48'
                    }
                }
            },
            legend: {
                data: ['RX', 'TX']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    // axisLabel: {
                    //   interval: 0,
                    //   rotate: 40
                    // },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            yAxis: [
                {
                    // axisLine: { show: true },
                    // axisTick: { show: true },
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'RX',
                    type: 'line',
                    smooth: true,
                    stack: '总量',
                    itemStyle: { normal: { color: "#922C48", areaStyle: { type: "default" } } },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'TX',
                    type: 'line',
                    smooth: true,
                    stack: '总量',
                    itemStyle: { normal: { color: "#425CC7", areaStyle: { type: "default" } } },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
    }
    ngOnInit() {
        this.service = this.route.snapshot.paramMap.get('name');
        this.memoryUsageChart = echarts.init(document.getElementById('memory-usage'));
        this.cpuUsageChart = echarts.init(document.getElementById('cpu-usage'));
        this.networkUsageChart = echarts.init(document.getElementById('network-usage'));
        this.option.legend.data.shift();
        this.option.legend.data.push("Memory");
        this.memoryUsageChart.setOption(this.option);
        this.option.legend.data.shift();
        this.option.legend.data.push("CPU");
        this.cpuUsageChart.setOption(this.option);
        this.networkUsageChart.setOption(this.netChartOption);
        this.sysService.getMetrics(this.service).subscribe((data) => {
            this.metrics = data[0];
            this.feedAllCharts();
        });
        this.timer = window.setInterval(this.metricsTimer, this.refreshRate * 1000, this);
    }
    metricsTimer(self) {
        self.sysService.getMetrics(self.service).subscribe((data) => {
            self.metrics = data[0];
            self.feedAllCharts();
        });
    }
    feedAllCharts() {
        let cpuOpt = this.cpuUsageChart.getOption();
        cpuOpt.series[0].data.shift();
        cpuOpt.series[0].data.push(this.metrics.result.cpuUsedPercent);
        cpuOpt.xAxis[0].data.shift();
        cpuOpt.xAxis[0].data.push(this.timestamp());
        this.cpuUsageChart.setOption(cpuOpt);
        let memOpt = this.memoryUsageChart.getOption();
        memOpt.series[0].data.shift();
        memOpt.series[0].data.push(this.metrics.result.raw.mem_perc.substring(0, this.metrics.result.raw.mem_perc.length - 1));
        memOpt.xAxis[0].data.shift();
        memOpt.xAxis[0].data.push(this.timestamp());
        this.memoryUsageChart.setOption(memOpt);
        let netOpt = this.networkUsageChart.getOption();
        let rx_tx_array = this.metrics.result.raw.net_io.split('/');
        let rx = rx_tx_array[0].trim().replace("kB", "").replace("MB", "");
        let tx = rx_tx_array[1].trim().replace("kB", "").replace("MB", "");
        netOpt.series[0].data.shift();
        netOpt.series[0].data.push(rx);
        netOpt.series[1].data.shift();
        netOpt.series[1].data.push(tx);
        netOpt.xAxis[0].data.shift();
        netOpt.xAxis[0].data.push(this.timestamp());
        this.networkUsageChart.setOption(netOpt);
    }
    onRateSelect() {
        console.log(this.refreshRate);
        clearInterval(this.timer);
        this.timer = window.setInterval(this.metricsTimer, this.refreshRate * 1000, this);
    }
    timestamp() {
        let ts = new Date();
        return `${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}`;
    }
    ngOnDestroy() {
        clearInterval(this.timer);
    }
}
MetricsComponent.ɵfac = function MetricsComponent_Factory(t) { return new (t || MetricsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_system_agent_service__WEBPACK_IMPORTED_MODULE_2__["SystemAgentService"])); };
MetricsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MetricsComponent, selectors: [["app-metrics"]], decls: 64, vars: 6, consts: [[1, "card", "mb-3"], [1, "card-header", "font-weight-bold"], [1, "fa", "fa-wrench"], [1, "card-body"], [1, "media"], [1, "align-self-center", "mr-3"], [1, "fa", "fa-server", "fa-3x", "color-edgex-red"], [1, "media-body"], [1, "d-inline", "font-weight-bold", "ml-3", "float-right"], [1, "badge", "badge-primary", "mr-1"], ["class", "text-weight", 4, "ngIf"], [1, "mt-0", "font-weight-bold"], [1, "badge", "badge-success"], [1, "font-weight-bold", "d-inline"], [1, "badge", "badge-info", "mr-2"], [1, "font-weight-bold", "ml-2", "d-inline"], [1, "badge", "badge-warning", "mr-1"], [1, "input-group", "mb-3", "mt-3", 2, "width", "200px"], [1, "input-group-prepend"], [1, "input-group-text"], [1, "form-control", 3, "ngModel", "ngModelChange"], ["selected", "", "value", "3"], ["value", "5"], ["value", "10"], ["value", "15"], [1, "row"], [1, "col-sm-4"], [1, "card"], [1, "card-header"], [1, "fa", "fa-area-chart"], [1, "card-body", "overflow-auto"], ["id", "memory-usage", 2, "width", "100%", "height", "300px"], ["id", "cpu-usage", 2, "width", "100%", "height", "300px"], ["id", "network-usage", 2, "width", "100%", "height", "300px"], [1, "text-weight"]], template: function MetricsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Setting ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "executor ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, MetricsComponent_span_12_Template, 2, 1, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h5", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "mem_usage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, MetricsComponent_span_20_Template, 2, 1, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "cpu_usage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, MetricsComponent_span_24_Template, 2, 1, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "net_io");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, MetricsComponent_span_28_Template, 2, 1, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Refresh Rate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "select", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function MetricsComponent_Template_select_ngModelChange_33_listener($event) { return ctx.refreshRate = $event; })("ngModelChange", function MetricsComponent_Template_select_ngModelChange_33_listener() { return ctx.onRateSelect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "option", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "3s");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "option", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "5s");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "option", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "10s");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "option", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "15s");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "i", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Memory usage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "i", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "CPU usage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "i", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Network traffic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.metrics);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.service, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.metrics);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.metrics);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.metrics);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.refreshRate);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_x"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZXRyaWNzLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MetricsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-metrics',
                templateUrl: './metrics.component.html',
                styleUrls: ['./metrics.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _services_system_agent_service__WEBPACK_IMPORTED_MODULE_2__["SystemAgentService"] }]; }, null); })();


/***/ }),

/***/ "Hsa7":
/*!*****************************************************!*\
  !*** ./src/app/system-agent/system-agent.module.ts ***!
  \*****************************************************/
/*! exports provided: SystemAgentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemAgentModule", function() { return SystemAgentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _system_agent_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./system-agent-routing.module */ "hJuq");
/* harmony import */ var _system_agent_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./system-agent.component */ "WIZq");
/* harmony import */ var _metrics_metrics_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./metrics/metrics.component */ "F5u4");
/* harmony import */ var _config_config_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config/config.component */ "5X28");
/* harmony import */ var _service_list_service_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./service-list/service-list.component */ "NCsr");









class SystemAgentModule {
}
SystemAgentModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SystemAgentModule });
SystemAgentModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SystemAgentModule_Factory(t) { return new (t || SystemAgentModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _system_agent_routing_module__WEBPACK_IMPORTED_MODULE_3__["SystemAgentRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SystemAgentModule, { declarations: [_system_agent_component__WEBPACK_IMPORTED_MODULE_4__["SystemAgentComponent"], _metrics_metrics_component__WEBPACK_IMPORTED_MODULE_5__["MetricsComponent"], _config_config_component__WEBPACK_IMPORTED_MODULE_6__["ConfigComponent"], _service_list_service_list_component__WEBPACK_IMPORTED_MODULE_7__["ServiceListComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _system_agent_routing_module__WEBPACK_IMPORTED_MODULE_3__["SystemAgentRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SystemAgentModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_system_agent_component__WEBPACK_IMPORTED_MODULE_4__["SystemAgentComponent"], _metrics_metrics_component__WEBPACK_IMPORTED_MODULE_5__["MetricsComponent"], _config_config_component__WEBPACK_IMPORTED_MODULE_6__["ConfigComponent"], _service_list_service_list_component__WEBPACK_IMPORTED_MODULE_7__["ServiceListComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _system_agent_routing_module__WEBPACK_IMPORTED_MODULE_3__["SystemAgentRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "NCsr":
/*!*********************************************************************!*\
  !*** ./src/app/system-agent/service-list/service-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: ServiceListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceListComponent", function() { return ServiceListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_system_agent_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/system-agent.service */ "nBa0");
/* harmony import */ var _message_message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../message/message.service */ "hsl2");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");






function ServiceListComponent_tr_25_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "running");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ServiceListComponent_tr_25_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "stopped");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a1) { return ["../metric", a1]; };
function ServiceListComponent_tr_25_a_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const s_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, s_r1.name));
} }
function ServiceListComponent_tr_25_a_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c1 = function (a1) { return ["../config", a1]; };
function ServiceListComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ServiceListComponent_tr_25_span_4_Template, 2, 0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ServiceListComponent_tr_25_span_5_Template, 2, 0, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ServiceListComponent_tr_25_a_7_Template, 2, 3, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ServiceListComponent_tr_25_a_8_Template, 2, 0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "i", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ServiceListComponent_tr_25_Template_span_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const s_r1 = ctx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.start(s_r1.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ServiceListComponent_tr_25_Template_span_click_15_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const s_r1 = ctx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.restart(s_r1.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "restart");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ServiceListComponent_tr_25_Template_span_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const s_r1 = ctx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.stop(s_r1.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "stop");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](s_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", s_r1.state);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "true");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", s_r1.state);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "true");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c1, s_r1.name));
} }
class ServiceListComponent {
    constructor(sysService, msgSvc) {
        this.sysService = sysService;
        this.msgSvc = msgSvc;
        this.defaultServcies = [
            "edgex-core-metadata", "edgex-core-data", "edgex-core-command",
            "edgex-support-notifications", "edgex-support-scheduler",
            "edgex-redis",
            "rule-engine",
            "edgex-ui-go",
            //"edgex-sys-mgmt-agent",
            "edgex-app-service-configurable-rules"
        ];
        this.disabled = false;
        this.toggleClass = "";
        this.availServices = [];
    }
    ngOnInit() {
        this.sysService.getHealth(this.defaultServcies.join(",")).subscribe(data => {
            for (const [k, v] of Object.entries(data)) {
                if (v) {
                    let s = { name: `${k}`, state: `${v}` };
                    this.availServices.push(s);
                }
            }
        });
    }
    refresh() {
        this.disabled = true;
        this.sysService.getHealth(this.defaultServcies.join(",")).subscribe(data => {
            this.availServices = [];
            for (const [k, v] of Object.entries(data)) {
                if (v) {
                    let s = { name: `${k}`, state: `${v}` };
                    this.availServices.push(s);
                }
            }
            this.disabled = false;
            this.msgSvc.success('refresh');
        });
    }
    start(name) {
        this.disabled = true;
        this.toggleClass = "badge badge-secondary";
        let self = this;
        this.sysService.start(name).subscribe(() => {
            this.availServices.forEach(function (svc) {
                if (svc.name == name) {
                    svc.state = "true";
                    self.disabled = false;
                    self.toggleClass = "";
                    return;
                }
            });
        });
    }
    restart(name) {
        this.disabled = true;
        let self = this;
        this.sysService.restart(name).subscribe(() => {
            this.availServices.forEach(function (svc) {
                if (svc.name == name) {
                    svc.state = "true";
                    self.disabled = false;
                    return;
                }
            });
        });
    }
    stop(name) {
        this.disabled = true;
        let self = this;
        this.sysService.stop(name).subscribe(() => {
            this.availServices.forEach(function (svc) {
                if (svc.name == name) {
                    svc.state = "false";
                    self.disabled = false;
                    return;
                }
            });
        });
    }
}
ServiceListComponent.ɵfac = function ServiceListComponent_Factory(t) { return new (t || ServiceListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_system_agent_service__WEBPACK_IMPORTED_MODULE_1__["SystemAgentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"])); };
ServiceListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ServiceListComponent, selectors: [["app-service-list"]], decls: 26, vars: 2, consts: [[1, "card"], [1, "card-header"], [1, "fa", "fa-list"], [1, "card-body", "p-0"], [1, "bg-light", "px-3", "py-2"], [1, "btn", "btn-primary", "btn-sm", 3, "disabled", "click"], [1, "fa", "fa-refresh", "mr-1"], [1, "table-responsive"], [1, "table", "table-hover", "text-truncate"], [1, "thead-light"], ["scope", "col"], [4, "ngFor", "ngForOf"], [3, "ngSwitch"], ["class", "badge badge-success", 4, "ngSwitchCase"], ["class", "badge badge-danger", 4, "ngSwitchDefault"], [3, "routerLink", 4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "routerLink"], [1, "fa", "fa-file-text"], ["role", "button", 1, "badge", "badge-info", "mr-1", 3, "click"], ["role", "button", 1, "badge", "badge-warning", "mr-1", 3, "click"], ["role", "button", 1, "badge", "badge-danger", 3, "click"], [1, "badge", "badge-success"], [1, "badge", "badge-danger"], [1, "fa", "fa-area-chart"], [1, "fa", "fa-ban", "fa-stack-lg", "text-danger"]], template: function ServiceListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h5", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Services List");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ServiceListComponent_Template_button_click_6_listener() { return ctx.refresh(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "refresh");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "table", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "thead", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "State");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Metric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Config");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Operation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ServiceListComponent_tr_25_Template, 19, 8, "tr", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.availServices);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchDefault"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2aWNlLWxpc3QuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServiceListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-service-list',
                templateUrl: './service-list.component.html',
                styleUrls: ['./service-list.component.css']
            }]
    }], function () { return [{ type: _services_system_agent_service__WEBPACK_IMPORTED_MODULE_1__["SystemAgentService"] }, { type: _message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"] }]; }, null); })();


/***/ }),

/***/ "WIZq":
/*!********************************************************!*\
  !*** ./src/app/system-agent/system-agent.component.ts ***!
  \********************************************************/
/*! exports provided: SystemAgentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemAgentComponent", function() { return SystemAgentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class SystemAgentComponent {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
    }
    ngOnInit() {
        this.activatedRoute.url
            .subscribe(url => console.log('The URL changed to: ' + url));
    }
}
SystemAgentComponent.ɵfac = function SystemAgentComponent_Factory(t) { return new (t || SystemAgentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"])); };
SystemAgentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SystemAgentComponent, selectors: [["app-system-agent"]], decls: 1, vars: 0, template: function SystemAgentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzeXN0ZW0tYWdlbnQuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SystemAgentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-system-agent',
                templateUrl: './system-agent.component.html',
                styleUrls: ['./system-agent.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "hJuq":
/*!*************************************************************!*\
  !*** ./src/app/system-agent/system-agent-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: SystemAgentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemAgentRoutingModule", function() { return SystemAgentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _config_config_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/config.component */ "5X28");
/* harmony import */ var _metrics_metrics_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metrics/metrics.component */ "F5u4");
/* harmony import */ var _system_agent_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./system-agent.component */ "WIZq");
/* harmony import */ var _service_list_service_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./service-list/service-list.component */ "NCsr");








const routes = [
    {
        path: '',
        component: _system_agent_component__WEBPACK_IMPORTED_MODULE_4__["SystemAgentComponent"],
        children: [
            {
                path: '',
                redirectTo: 'service-list',
                pathMatch: 'full',
            },
            {
                path: 'service-list',
                component: _service_list_service_list_component__WEBPACK_IMPORTED_MODULE_5__["ServiceListComponent"],
            },
            {
                path: 'metric/:name',
                component: _metrics_metrics_component__WEBPACK_IMPORTED_MODULE_3__["MetricsComponent"],
            },
            {
                path: 'config/:name',
                component: _config_config_component__WEBPACK_IMPORTED_MODULE_2__["ConfigComponent"]
            }
        ]
    }
];
class SystemAgentRoutingModule {
}
SystemAgentRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SystemAgentRoutingModule });
SystemAgentRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function SystemAgentRoutingModule_Factory(t) { return new (t || SystemAgentRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SystemAgentRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SystemAgentRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


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





class SystemAgentService {
    constructor(http, msgSvc) {
        this.http = http;
        this.msgSvc = msgSvc;
        this.endpoint = "/system";
        this.version1 = "/api/v1";
        this.urlPrefix = `${this.endpoint}${this.version1}`;
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
    getConfig(services) {
        let url = `${this.urlPrefix}${this.configUrl}${services}`;
        return this.http.get(url);
    }
    getMetrics(services) {
        let url = `${this.urlPrefix}${this.metricsUrl}${services}`;
        return this.http.get(url);
    }
    getHealth(services) {
        let url = `${this.urlPrefix}${this.healthUrl}${services}`;
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
        let url = `${this.urlPrefix}${this.operationUrl}`;
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
SystemAgentService.ɵfac = function SystemAgentService_Factory(t) { return new (t || SystemAgentService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"])); };
SystemAgentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SystemAgentService, factory: SystemAgentService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](SystemAgentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }, { type: _message_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=system-agent-system-agent-module.js.map