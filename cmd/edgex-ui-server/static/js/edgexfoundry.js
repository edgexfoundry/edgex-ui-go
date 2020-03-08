/*
* Copyright © 2017-2018 All Rights Reserved.
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
*/

function EdgexFoundry(){
  this.coreData = null;
  this.coreMetadata = null;
  this.coreCommand = null;
  this.coreExport = null;
  this.supportLogging = null;
  this.supportNotification= null;
  this.supportScheduler= null;
  this.supportRuleEngine = null;
  this.deviceService = null;
  this.appService = null;
  this.utils = null;
}

EdgexFoundry.prototype = {
  constructor: EdgexFoundry,
}
//初始化对象
var orgEdgexFoundry =  new EdgexFoundry();

bootbox.addLocale('my-locale', {
    OK: 'OK',
    CANCEL : 'No',
    CONFIRM : 'Yes'
});

bootbox.setDefaults({ locale: 'my-locale' });
