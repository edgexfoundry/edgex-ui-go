"use strict";(self.webpackChunkweb=self.webpackChunkweb||[]).push([[707],{6342:(T,h,a)=>{a.d(h,{Y:()=>u});var e=a(8583),r=a(3092),C=a(9502),p=a(476);const g=[];let v=(()=>{class d{}return d.\u0275fac=function(l){return new(l||d)},d.\u0275mod=p.oAB({type:d}),d.\u0275inj=p.cJS({imports:[[C.Bz.forChild(g)],C.Bz]}),d})(),u=(()=>{class d{}return d.\u0275fac=function(l){return new(l||d)},d.\u0275mod=p.oAB({type:d}),d.\u0275inj=p.cJS({imports:[[e.ez,r.u5,v]]}),d})()},9549:(T,h,a)=>{a.d(h,{P:()=>q});var e=a(476),r=a(3092),C=a(8583),p=a(7982);function g(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e.TgZ(2,"div",24),e.TgZ(3,"input",25),e.NdJ("click",function(n){const Z=e.CHM(t).$implicit;return e.oxw().selectOne(n,Z)}),e.qZA(),e.qZA(),e.qZA(),e.TgZ(4,"td",26),e._uU(5),e.qZA(),e.TgZ(6,"td",26),e._uU(7),e.qZA(),e.TgZ(8,"td"),e.TgZ(9,"span",27),e.NdJ("click",function(){const c=e.CHM(t).$implicit;return e.oxw().checkOne(c)}),e._uU(10,"coreCommands"),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=m.$implicit,i=e.oxw();e.ekj("table-active",i.isChecked(t)),e.xp6(3),e.Q6J("checked",i.isChecked(t)),e.xp6(2),e.Oqu(t.deviceName),e.xp6(2),e.Oqu(t.profileName)}}let v=(()=>{class o{constructor(t){this.cmdSvc=t,this.deviceCoreCmdList=[],this.deviceCoreCmdSelectedEvent=new e.vpe,this.delegationEvent=new e.vpe,this.pagination=1,this.pageLimit=5,this.pageOffset=(this.pagination-1)*this.pageLimit}ngOnInit(){this.findAllDeviceCoreCmdsPagination()}findAllDeviceCoreCmdsPagination(){this.cmdSvc.allDeviceCoreCommandsPagination(this.pageOffset,this.pageLimit).subscribe(t=>{this.deviceCoreCmdList=t.deviceCoreCommands})}delegation(){this.delegationEvent.emit(!0)}isChecked(t){var i;return(null===(i=this.deviceCoreCmdSelected)||void 0===i?void 0:i.deviceName)===t.deviceName}selectOne(t,i){this.deviceCoreCmdSelected=t.target.checked?i:void 0,this.delegation(),this.deviceCoreCmdSelectedEvent.emit(this.deviceCoreCmdSelected)}checkOne(t){this.deviceCoreCmdSelected=t,this.deviceCoreCmdSelectedEvent.emit(this.deviceCoreCmdSelected)}onPageSelected(){this.delegation(),this.resetPagination(),this.setPagination(),this.findAllDeviceCoreCmdsPagination()}prePage(){this.delegation(),this.setPagination(-1),this.findAllDeviceCoreCmdsPagination()}nextPage(){this.delegation(),this.setPagination(1),this.findAllDeviceCoreCmdsPagination()}setPagination(t){1===t?this.pagination+=1:-1===t&&(this.pagination-=1),this.pageOffset=(this.pagination-1)*this.pageLimit}resetPagination(){this.pagination=1}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(p.V))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-device-core-command-list"]],inputs:{deviceCoreCmdSelected:"deviceCoreCmdSelected"},outputs:{deviceCoreCmdSelectedEvent:"deviceCoreCmdSelectedEvent",delegationEvent:"delegationEvent"},decls:41,vars:4,consts:[[1,"card"],[1,"card-header"],[1,"fa","fa-list","text-danger"],[1,"card-body","p-0"],[1,"table-responsive"],[1,"table","table-hover","text-truncate"],[1,"thead-light"],["scope","col"],[3,"table-active",4,"ngFor","ngForOf"],[1,"card-footer","text-muted","p-1"],["aria-label","navigation"],[1,"pagination","justify-content-end","m-0"],[1,"page-item","mr-2","mt-1"],[1,"align-middle"],[1,"page-item","mr-2"],["name","pageLimit","id","pageLimit",1,"custom-select",3,"ngModel","ngModelChange","mousedown"],["value","5"],["value","10"],["value","20"],[1,"page-item","mr-1"],[1,"page-link","btn",3,"disabled","click"],[1,"fa","fa-angle-double-left"],[1,"page-item"],[1,"fa","fa-angle-double-right"],[1,"form-group","form-check"],["type","checkbox","role","button",1,"form-check-input",3,"checked","click"],[1,"user-select-all"],["role","button",1,"badge","badge-primary",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"i",2),e._uU(3," Device Core Command List "),e.qZA(),e.TgZ(4,"div",3),e.TgZ(5,"div",4),e.TgZ(6,"table",5),e.TgZ(7,"thead",6),e.TgZ(8,"tr"),e.TgZ(9,"th",7),e._uU(10,"#"),e.qZA(),e.TgZ(11,"th",7),e._uU(12,"Device"),e.qZA(),e.TgZ(13,"th",7),e._uU(14,"DeviceProfile"),e.qZA(),e.TgZ(15,"th",7),e._uU(16,"AssociatedCommands"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(17,"tbody"),e.YNc(18,g,11,5,"tr",8),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(19,"div",9),e.TgZ(20,"nav",10),e.TgZ(21,"ul",11),e.TgZ(22,"li",12),e.TgZ(23,"span",13),e._uU(24,"items per page"),e.qZA(),e.qZA(),e.TgZ(25,"li",14),e.TgZ(26,"select",15),e.NdJ("ngModelChange",function(c){return i.pageLimit=c})("mousedown",function(){return i.delegation()})("ngModelChange",function(){return i.onPageSelected()}),e.TgZ(27,"option",16),e._uU(28,"5"),e.qZA(),e.TgZ(29,"option",17),e._uU(30,"10"),e.qZA(),e.TgZ(31,"option",18),e._uU(32,"20"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(33,"li",19),e.TgZ(34,"button",20),e.NdJ("click",function(){return i.prePage()}),e._UZ(35,"i",21),e._uU(36," Previous"),e.qZA(),e.qZA(),e.TgZ(37,"li",22),e.TgZ(38,"button",20),e.NdJ("click",function(){return i.nextPage()}),e._uU(39,"Next "),e._UZ(40,"i",23),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(18),e.Q6J("ngForOf",i.deviceCoreCmdList),e.xp6(8),e.Q6J("ngModel",i.pageLimit),e.xp6(8),e.Q6J("disabled",1===i.pagination),e.xp6(4),e.Q6J("disabled",i.pageLimit>i.deviceCoreCmdList.length))},directives:[C.sg,r.EJ,r.JJ,r.On,r.YN,r.Kr],styles:[".btn[disabled][_ngcontent-%COMP%]:hover{cursor:not-allowed}"]}),o})();function u(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"input",17),e.NdJ("ngModelChange",function(n){return e.CHM(t),e.oxw(3).httpMethod=n})("click",function(n){return e.CHM(t),e.oxw(3).methodChecked(n,"GET")}),e.qZA()}if(2&o){const t=e.oxw(2),i=t.$implicit,n=t.index,c=e.oxw();e.hYB("id","get-",i,"-",n,""),e.Q6J("ngModel",c.httpMethod)}}function d(o,m){if(1&o&&(e.TgZ(0,"div",13),e.TgZ(1,"span",14),e.YNc(2,u,1,3,"input",15),e.TgZ(3,"label",16),e._uU(4,"get"),e.qZA(),e.qZA(),e.qZA()),2&o){const t=e.oxw(),i=t.$implicit,n=t.index,c=e.oxw();e.xp6(2),e.Q6J("ngIf",c.isChecked(i.name)),e.xp6(1),e.hYB("for","get-",i,"-",n,"")}}function s(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"input",19),e.NdJ("ngModelChange",function(n){return e.CHM(t),e.oxw(3).httpMethod=n})("click",function(n){return e.CHM(t),e.oxw(3).methodChecked(n,"PUT")}),e.qZA()}if(2&o){const t=e.oxw(2),i=t.$implicit,n=t.index,c=e.oxw();e.hYB("id","set-",i,"-",n,""),e.Q6J("ngModel",c.httpMethod)}}function l(o,m){if(1&o&&(e.TgZ(0,"div",13),e.TgZ(1,"span",14),e.YNc(2,s,1,3,"input",18),e.TgZ(3,"label",16),e._uU(4,"set"),e.qZA(),e.qZA(),e.qZA()),2&o){const t=e.oxw(),i=t.$implicit,n=t.index,c=e.oxw();e.xp6(2),e.Q6J("ngIf",c.isChecked(i.name)),e.xp6(1),e.hYB("for","set-",i,"-",n,"")}}function _(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e.TgZ(2,"input",10),e.NdJ("click",function(n){const Z=e.CHM(t).$implicit;return e.oxw().selectOne(n,Z)}),e.qZA(),e.qZA(),e.TgZ(3,"td",11),e._uU(4),e.qZA(),e.TgZ(5,"td"),e.TgZ(6,"div"),e.YNc(7,d,5,3,"div",12),e.YNc(8,l,5,3,"div",12),e.qZA(),e.qZA(),e.TgZ(9,"td"),e._uU(10),e.qZA(),e.TgZ(11,"td"),e._uU(12),e.qZA(),e.qZA()}if(2&o){const t=m.$implicit,i=e.oxw();e.ekj("table-active",i.isChecked(t.name)),e.xp6(2),e.Q6J("checked",i.isChecked(t.name)),e.xp6(2),e.Oqu(t.name),e.xp6(3),e.Q6J("ngIf",t.get),e.xp6(1),e.Q6J("ngIf",t.set),e.xp6(2),e.Oqu(t.url),e.xp6(2),e.Oqu(t.path)}}let f=(()=>{class o{constructor(t){this.cmdSvc=t,this.singleCoreCmdSelectedEvent=new e.vpe,this.deviceAssociatedCoreCommandsList=[],this.coreCmdMethodEvent=new e.vpe,this.delegationEvent=new e.vpe}ngOnInit(){this.cmdSvc.findDeviceAssociatedCommnadsByDeviceName(this.deviceName).subscribe(t=>{this.deviceAssociatedCoreCommandsList=t.deviceCoreCommand.coreCommands})}methodChecked(t,i){this.httpMethod=t.target.checked?i:"",this.coreCmdMethodEvent.emit(this.httpMethod),this.delegationEvent.emit(!0)}isChecked(t){var i;return(null===(i=this.coreCmdSelected)||void 0===i?void 0:i.name)===t}radioUnchecked(t){return t||!1}selectOne(t,i){this.coreCmdSelected=t.target.checked?i:{},this.delegationEvent.emit(!0),this.singleCoreCmdSelectedEvent.emit(this.coreCmdSelected),this.coreCmdMethodEvent.emit(void 0)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(p.V))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-device-associated-core-command-list"]],inputs:{deviceName:"deviceName",coreCmdSelected:"coreCmdSelected",httpMethod:"httpMethod"},outputs:{singleCoreCmdSelectedEvent:"singleCoreCmdSelectedEvent",coreCmdMethodEvent:"coreCmdMethodEvent",delegationEvent:"delegationEvent"},decls:24,vars:2,consts:[[1,"card","border-0"],[1,"card-header"],[1,"fa","fa-list","text-danger","mr-2"],[1,"text-info"],[1,"card-body","p-0"],[1,"table-responsive"],[1,"table","table-hover","text-truncate"],[1,"thead-light"],["scope","col"],[3,"table-active",4,"ngFor","ngForOf"],["type","checkbox","role","button",3,"checked","click"],[1,"user-select-all"],["class","form-check form-check-inline",4,"ngIf"],[1,"form-check","form-check-inline"],[1,"badge"],["class","form-check-input align-middle","type","radio","name","cmdMethod","value","GET",3,"id","ngModel","ngModelChange","click",4,"ngIf"],[1,"form-check-label","align-middle",3,"for"],["type","radio","name","cmdMethod","value","GET",1,"form-check-input","align-middle",3,"id","ngModel","ngModelChange","click"],["class","form-check-input align-middle","type","radio","name","cmdMethod","value","PUT",3,"id","ngModel","ngModelChange","click",4,"ngIf"],["type","radio","name","cmdMethod","value","PUT",1,"form-check-input","align-middle",3,"id","ngModel","ngModelChange","click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"i",2),e.TgZ(3,"span"),e.TgZ(4,"span",3),e._uU(5),e.qZA(),e._uU(6," Associated Commands List"),e.qZA(),e.qZA(),e.TgZ(7,"div",4),e.TgZ(8,"div",5),e.TgZ(9,"table",6),e.TgZ(10,"thead",7),e.TgZ(11,"tr"),e.TgZ(12,"th",8),e._uU(13,"#"),e.qZA(),e.TgZ(14,"th",8),e._uU(15,"Name"),e.qZA(),e.TgZ(16,"th",8),e._uU(17,"Method"),e.qZA(),e.TgZ(18,"th",8),e._uU(19,"URL"),e.qZA(),e.TgZ(20,"th",8),e._uU(21,"Path"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"tbody"),e.YNc(23,_,13,8,"tr",9),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(5),e.Oqu(i.deviceName),e.xp6(18),e.Q6J("ngForOf",i.deviceAssociatedCoreCommandsList))},directives:[C.sg,C.O5,r._,r.Fj,r.JJ,r.On],styles:[""]}),o})();function x(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"div",13),e.TgZ(1,"nav",14),e.TgZ(2,"ol",15),e.TgZ(3,"li",16),e.TgZ(4,"a",17),e.NdJ("click",function(){return e.CHM(t),e.oxw(2).backtoDeviceCoreCommandList()}),e._uU(5,"DeviceCoreCommandList"),e.qZA(),e.qZA(),e.TgZ(6,"li",18),e._uU(7),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=e.oxw(2);e.xp6(7),e.Oqu(t.deviceName)}}function A(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"div"),e.TgZ(1,"app-device-core-command-list",19),e.NdJ("delegationEvent",function(n){return e.CHM(t),e.oxw(2).ondelegation(n)})("deviceCoreCmdSelectedEvent",function(n){return e.CHM(t),e.oxw(2).onDeviceCoreCmdSelected(n)}),e.qZA(),e.qZA()}if(2&o){const t=e.oxw(2);e.xp6(1),e.Q6J("deviceCoreCmdSelected",t.deviceCoreCmdSelected)}}function b(o,m){if(1&o){const t=e.EpF();e.TgZ(0,"div"),e.TgZ(1,"app-device-associated-core-command-list",20),e.NdJ("coreCmdMethodEvent",function(n){return e.CHM(t),e.oxw(2).onCmdMethodSelected(n)})("delegationEvent",function(n){return e.CHM(t),e.oxw(2).ondelegation(n)})("singleCoreCmdSelectedEvent",function(n){return e.CHM(t),e.oxw(2).onCoreCmdSelected(n)}),e.qZA(),e.qZA()}if(2&o){const t=e.oxw(2);e.xp6(1),e.Q6J("coreCmdSelected",t.coreCmdSelected)("deviceName",t.deviceName)("httpMethod",t.httpMethod)}}function M(o,m){if(1&o&&(e.TgZ(0,"div",8),e.TgZ(1,"div",9),e.YNc(2,x,8,1,"div",10),e.TgZ(3,"div",11),e.YNc(4,A,2,1,"div",12),e.YNc(5,b,2,3,"div",12),e.qZA(),e.qZA(),e.qZA()),2&o){const t=e.oxw();e.xp6(2),e.Q6J("ngIf",!t.deviceCoreCmdListVisible),e.xp6(2),e.Q6J("ngIf",t.deviceCoreCmdListVisible),e.xp6(1),e.Q6J("ngIf",!t.deviceCoreCmdListVisible)}}let q=(()=>{class o{constructor(){this.visible=!1,this.validate=!1,this.deviceName="",this.commandSelectedEvent=new e.vpe,this.cmdMethodEvent=new e.vpe,this.deviceCoreCmdListVisible=!0,this.delegation=!1,this.coreCmdSelected={}}ngOnInit(){}ondelegation(t){document.getElementById("cmd-combo").focus(),this.delegation=t}onDeviceCoreCmdSelected(t){t?(this.deviceCoreCmdSelected=t,this.deviceName=this.deviceCoreCmdSelected.deviceName,this.deviceCoreCmdListVisible=!1):this.deviceCoreCmdSelected=t}onCmdMethodSelected(t){this.httpMethod=t,this.cmdMethodEvent.emit(this.httpMethod)}onCoreCmdSelected(t){this.coreCmdSelected=t,this.commandSelectedEvent.emit(this.coreCmdSelected)}backtoDeviceCoreCommandList(){this.deviceCoreCmdListVisible=!0}toggle(t){t.stopImmediatePropagation(),this.visible=!this.visible}close(t){setTimeout(()=>{this.delegation?this.delegation=!1:this.visible=!1},130)}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-device-core-command-combo-list"]],inputs:{validate:"validate",deviceName:"deviceName",coreCmdSelected:"coreCmdSelected"},outputs:{commandSelectedEvent:"commandSelectedEvent",cmdMethodEvent:"cmdMethodEvent"},decls:10,vars:6,consts:[["tabindex","-1","id","cmd-combo",1,"cmd-combo",3,"blur"],[1,"input-group","has-validation",3,"mousedown"],["type","text","name","coreCmdSelected","disabled","","maxlength","0","required","",1,"form-control",3,"ngModel","ngModelChange"],[1,"input-group-append"],["role","button",1,"input-group-text"],[1,"fa","fa-chevron-down"],["id","validationCoreCmdPathFeedback",1,"invalid-feedback"],["class","cmd-combo-body shadow rounded",4,"ngIf"],[1,"cmd-combo-body","shadow","rounded"],[1,"card"],["class","card-header",4,"ngIf"],[1,"card-body","p-0"],[4,"ngIf"],[1,"card-header"],["aria-label","breadcrumb",1,"m-0","p-0"],[1,"breadcrumb","p-0","m-0","bg-light"],[1,"breadcrumb-item","text-primary"],["role","button",3,"click"],["aria-current","page",1,"breadcrumb-item","active"],[3,"deviceCoreCmdSelected","delegationEvent","deviceCoreCmdSelectedEvent"],[3,"coreCmdSelected","deviceName","httpMethod","coreCmdMethodEvent","delegationEvent","singleCoreCmdSelectedEvent"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.NdJ("blur",function(c){return i.close(c)}),e.TgZ(1,"div",1),e.NdJ("mousedown",function(c){return i.toggle(c)}),e.TgZ(2,"input",2),e.NdJ("ngModelChange",function(c){return i.coreCmdSelected.path=c}),e.qZA(),e.TgZ(3,"div",3),e.TgZ(4,"span",4),e._UZ(5,"i",5),e.qZA(),e.qZA(),e.TgZ(6,"div",6),e.TgZ(7,"small"),e._uU(8,"the command name and method can't be empty!"),e.qZA(),e.qZA(),e.qZA(),e.YNc(9,M,6,3,"div",7),e.qZA()),2&t&&(e.xp6(2),e.ekj("is-invalid",(!i.coreCmdSelected.path||!i.httpMethod)&&i.validate)("is-valid",i.coreCmdSelected.path&&i.httpMethod&&i.validate),e.Q6J("ngModel",i.coreCmdSelected.path),e.xp6(7),e.Q6J("ngIf",i.visible))},directives:[r.Fj,r.nD,r.Q7,r.JJ,r.On,C.O5,v,f],styles:[".cmd-combo[_ngcontent-%COMP%]{position:relative;right:auto}.cmd-combo-shielder[_ngcontent-%COMP%]{position:fixed;top:0;bottom:0;right:0;left:0;z-index:101}.cmd-combo-body[_ngcontent-%COMP%]{position:absolute;top:33px;bottom:auto;left:0;right:0;z-index:105;visibility:visible;display:inline-block}"]}),o})()},7982:(T,h,a)=>{a.d(h,{V:()=>g});var e=a(1841),r=a(5894),C=a(476),p=a(4889);let g=(()=>{class v{constructor(d,s){this.http=d,this.errorSvc=s,this.endpoint="/core-command",this.version="/api/v2",this.urlPrefix=`${this.endpoint}${this.version}`,this.endpointHealthUrl="/ping",this.versionUrl="/version",this.configUrl="/config",this.deviceCoreCommandListUrl=`${this.urlPrefix}/device/all`,this.commandsByDeviceIdUrl=`${this.urlPrefix}/device/`,this.commandsByDeviceNameUrl=`${this.urlPrefix}/device/name/`,this.issueCmdByDeviceNameAndCmdNameUrl=`${this.urlPrefix}/device/name/`,this.httpPostOrPutJSONOptions={headers:new e.WM({"Content-type":"application/json"})}}getConfig(){return this.http.get(`${this.urlPrefix}${this.configUrl}`).pipe((0,r.K)(s=>this.errorSvc.handleError(s)))}findCommnadsByDeviceId(d){return this.http.get(`${this.commandsByDeviceIdUrl}${d}`).pipe((0,r.K)(l=>this.errorSvc.handleError(l)))}allDeviceCoreCommandsPagination(d,s){return this.http.get(`${this.deviceCoreCommandListUrl}?offset=${d}&limit=${s}`).pipe((0,r.K)(_=>this.errorSvc.handleError(_)))}findDeviceAssociatedCommnadsByDeviceName(d){return this.http.get(`${this.commandsByDeviceNameUrl}${d}`).pipe((0,r.K)(l=>this.errorSvc.handleError(l)))}findAllDeviceCommnads(){return this.http.get(`${this.urlPrefix}/device`).pipe((0,r.K)(s=>this.errorSvc.handleError(s)))}issueGetBinaryCmd(d,s){return this.http.request("GET",`${this.commandsByDeviceIdUrl}${d}/command/${s}`,{responseType:"arraybuffer"}).pipe((0,r.K)(_=>this.errorSvc.handleError(_)))}issueGetCmd(d,s){return this.http.get(`${this.issueCmdByDeviceNameAndCmdNameUrl}${d}/${s}`).pipe((0,r.K)(_=>this.errorSvc.handleError(_)))}issueSetCmd(d,s,l){return this.http.put(`${this.issueCmdByDeviceNameAndCmdNameUrl}${d}/${s}`,JSON.stringify(l),this.httpPostOrPutJSONOptions).pipe((0,r.K)(f=>this.errorSvc.handleError(f)))}}return v.\u0275fac=function(d){return new(d||v)(C.LFG(e.eN),C.LFG(p.T))},v.\u0275prov=C.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),v})()}}]);