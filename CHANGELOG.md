
<a name="EdgeX User Interface (found in edgex-ui-go) Changelog"></a>
## EdgeX Foundry User Interface
[Github repository](https://github.com/edgexfoundry/edgex-ui-go)

## Change Logs for EdgeX Dependencies

### Change Logs for EdgeX Dependencies

- [go-mod-core-contracts](https://github.com/edgexfoundry/go-mod-core-contracts/blob/main/CHANGELOG.md)
- [go-mod-registry](https://github.com/edgexfoundry/go-mod-registry/blob/main/CHANGELOG.md) 
- [go-mod-configuration](https://github.com/edgexfoundry/go-mod-configuration/blob/main/CHANGELOG.md)

## [v2.2.0] Kamakura - 2022-5-11 (Only compatible with the 2.x release)

### Features ✨
- Add Content-Security-Policy request header ([#e242a1d](https://github.com/edgexfoundry/edgex-ui-go/commits/e242a1d))
- Add security response header and cache control header and remove Authorization request header under unsecure mode ([#f2a648b](https://github.com/edgexfoundry/edgex-ui-go/commits/f2a648b))
- Add GUI testing code ([#c9d48a8](https://github.com/edgexfoundry/edgex-ui-go/commits/c9d48a8))
- Add ability to turn on/off popup messages [#474](https://github.com/edgexfoundry/edgex-ui-go/issues/474) ([#491](https://github.com/edgexfoundry/edgex-ui-go/issues/491)) ([#51fdecd](https://github.com/edgexfoundry/edgex-ui-go/commits/51fdecd))
### Bug Fixes 🐛
- Fix update of Name and Description on device ([#a297fae](https://github.com/edgexfoundry/edgex-ui-go/commits/a297fae))
### Code Refactoring ♻
- Remove OperatingState property when new device adding and only show it when editing ([#dce5d0b](https://github.com/edgexfoundry/edgex-ui-go/commits/dce5d0b))
- Ruleengine refactor ([#502](https://github.com/edgexfoundry/edgex-ui-go/issues/502)) ([#3fc63fb](https://github.com/edgexfoundry/edgex-ui-go/commits/3fc63fb))

## [v2.1.0] Jakarta - 2021-11-18 (Only compatible with the 2.x release)

### Features ✨
- Support both secure and insecure mode ([#7f732f6](https://github.com/edgexfoundry/edgex-ui-go/commits/7f732f6))
- Update system-agent module achieving all services list instead of hard-code and remove dead codes in system agent component ([#8a3e9f3](https://github.com/edgexfoundry/edgex-ui-go/commits/8a3e9f3))
- Update app-service and system-agent service to support achieving service list or app service list from backend server instead of hard-code ([#719f28b](https://github.com/edgexfoundry/edgex-ui-go/commits/719f28b))
- Update whole app-service module with new method achieving app service from backend server instead of hard-code names of app service ([#ff278cd](https://github.com/edgexfoundry/edgex-ui-go/commits/ff278cd))
- Add contracts support achieving all register services ([#b4db086](https://github.com/edgexfoundry/edgex-ui-go/commits/b4db086))
- Add backend support for achieving register service endpoints from register center ([#701ea96](https://github.com/edgexfoundry/edgex-ui-go/commits/701ea96))
- Add snap support ([#436](https://github.com/edgexfoundry/edgex-ui-go/issues/436)) ([#a8de897](https://github.com/edgexfoundry/edgex-ui-go/commits/a8de897))
- Update all select boxes with custom-select CSS style ([#de522fe](https://github.com/edgexfoundry/edgex-ui-go/commits/de522fe))
- Remove search conditions by catagories ([#5d6ab8b](https://github.com/edgexfoundry/edgex-ui-go/commits/5d6ab8b))
- Move profileNames space character check to profile combo list component ([#72568e1](https://github.com/edgexfoundry/edgex-ui-go/commits/72568e1))
- Update device-combo-list component to support device selected in pipeline-function component ([#16dd423](https://github.com/edgexfoundry/edgex-ui-go/commits/16dd423))
- Add new component device profile combo list supporting in app svc configuration module used for users selecting multiple profiles ([#764ebff](https://github.com/edgexfoundry/edgex-ui-go/commits/764ebff))
- Add drag-drop zone highlight directives to improve user experience when users use drag-drop function to select pipeline functions ([#ed68206](https://github.com/edgexfoundry/edgex-ui-go/commits/ed68206))
### Bug Fixes 🐛
- Can't set pipeline functions parameters when params value changed ([#032aeb1](https://github.com/edgexfoundry/edgex-ui-go/commits/032aeb1))
- Pipeline functions configurable updates error ([#f003326](https://github.com/edgexfoundry/edgex-ui-go/commits/f003326))
- Can't send put command when user not set the parameters, changed to use default value when users not setting this value ([#8ba7dec](https://github.com/edgexfoundry/edgex-ui-go/commits/8ba7dec))
- Add modbus device failed without timeout and Idletimeout fields, and fix wrong event resource range when device profile is changed ([#5e0f9f4](https://github.com/edgexfoundry/edgex-ui-go/commits/5e0f9f4))
- Selected all and select one method with wrong logic when pagenation is changed ([#1ea48bd](https://github.com/edgexfoundry/edgex-ui-go/commits/1ea48bd))
- Not work properly on selectAll and single select operation ([#3cd8aa0](https://github.com/edgexfoundry/edgex-ui-go/commits/3cd8aa0))
- All datagrid and pagination not working as expected ([#d3b4d40](https://github.com/edgexfoundry/edgex-ui-go/commits/d3b4d40))
- GUI backend server can not update app configurable ([#0887a2a](https://github.com/edgexfoundry/edgex-ui-go/commits/0887a2a))
- Default app svc on register center return the configurable with some fields values like func executer order, selected profiles or device names containing space character result failing parsing ([#418ef8e](https://github.com/edgexfoundry/edgex-ui-go/commits/418ef8e))
### Code Refactoring ♻
- The whole app svc service had been refactor ([#4e4d5f8](https://github.com/edgexfoundry/edgex-ui-go/commits/4e4d5f8))
- The whole backend of app svc config had been refactored, unused and dead code is removed ([#3651550](https://github.com/edgexfoundry/edgex-ui-go/commits/3651550))
- The whole app service module, include app list component and app svc configurable component have been refactored ([#a441ce0](https://github.com/edgexfoundry/edgex-ui-go/commits/a441ce0))

## [v2.0.0] Ireland - 2021-06-30  (Not Compatible with 1.x releases)

### Features ✨
- Update intervalaction with new field adminState to match edgex v2 updates ([#456f546](https://github.com/edgexfoundry/edgex-ui-go/commits/456f546))
- Add the route path configuration of app service ([#0733ae0](https://github.com/edgexfoundry/edgex-ui-go/commits/0733ae0))
- Add relevant message prompts when no data stream is available ([#77fdb37](https://github.com/edgexfoundry/edgex-ui-go/commits/77fdb37))
- Add new component for reading of device ([#2ce0ec1](https://github.com/edgexfoundry/edgex-ui-go/commits/2ce0ec1))
- Add new component for events of device ([#f517c96](https://github.com/edgexfoundry/edgex-ui-go/commits/f517c96))
- Adding new app-service model ([#6c2af2e](https://github.com/edgexfoundry/edgex-ui-go/commits/6c2af2e))
- Update the range of autoevent resource value, including both device resource and device command ([#fa57b5b](https://github.com/edgexfoundry/edgex-ui-go/commits/fa57b5b))
- Add unknown value to device operatingstate ([#74b5e35](https://github.com/edgexfoundry/edgex-ui-go/commits/74b5e35))
- Update the range of autoevent resource value, including both device resource and device command ([#4bddd06](https://github.com/edgexfoundry/edgex-ui-go/commits/4bddd06))
- Can't properly assign email address value ([#b5eb532](https://github.com/edgexfoundry/edgex-ui-go/commits/b5eb532))
- Remove export preview section ([#94279a2](https://github.com/edgexfoundry/edgex-ui-go/commits/94279a2))
- Add provision watcher module for device auto discover ([#6fc98ff](https://github.com/edgexfoundry/edgex-ui-go/commits/6fc98ff))
- Basic feature of subscription list component ([#03d6e45](https://github.com/edgexfoundry/edgex-ui-go/commits/03d6e45))
- Basic features of notification component ([#d4ee7f0](https://github.com/edgexfoundry/edgex-ui-go/commits/d4ee7f0))
- Init notification module ([#a2c3d36](https://github.com/edgexfoundry/edgex-ui-go/commits/a2c3d36))
- Add pagination feature for device list component ([#3302c63](https://github.com/edgexfoundry/edgex-ui-go/commits/3302c63))
- Add interval module and interval action module ([#303d1fb](https://github.com/edgexfoundry/edgex-ui-go/commits/303d1fb))
- Add all http methods of scheduler ([#c6029ef](https://github.com/edgexfoundry/edgex-ui-go/commits/c6029ef))
- Add basic pagination for device profile ([#4699a8f](https://github.com/edgexfoundry/edgex-ui-go/commits/4699a8f))

### Bug Fixes 🐛
- Interval init failed ([#8bf92a8](https://github.com/edgexfoundry/edgex-ui-go/commits/8bf92a8))
- Not return properly error message when user can not add a new one profile through UI backend ([#fa86b0a](https://github.com/edgexfoundry/edgex-ui-go/commits/fa86b0a))
- Can't render device list properly when click the tab panel title and command card, autoevent card not hide properly when delete one selected device ([#2d1253c](https://github.com/edgexfoundry/edgex-ui-go/commits/2d1253c))
- Incorrect URL path splicing ([#3fb3b99](https://github.com/edgexfoundry/edgex-ui-go/commits/3fb3b99))
- Can't update device profile ([#577cd05](https://github.com/edgexfoundry/edgex-ui-go/commits/577cd05))
- Not give user error message when operate get error message ([#1f68ba2](https://github.com/edgexfoundry/edgex-ui-go/commits/1f68ba2))
- Not render successfully when interval action editable template selected ([#d8362eb](https://github.com/edgexfoundry/edgex-ui-go/commits/d8362eb))
- Id not uniqued for addressHost And addressPort ([#8c75117](https://github.com/edgexfoundry/edgex-ui-go/commits/8c75117))
- All pagination selected box not works as expected and selected items doesn't be clean when executes delete operation success ([#49c4d70](https://github.com/edgexfoundry/edgex-ui-go/commits/49c4d70))
- Popover component can't hide when skip to other component ([#6fe2336](https://github.com/edgexfoundry/edgex-ui-go/commits/6fe2336))
- RunOnce not display when it's value is false ([#0bb3d2f](https://github.com/edgexfoundry/edgex-ui-go/commits/0bb3d2f))
- Select unbind value of component automatically ([#34a190f](https://github.com/edgexfoundry/edgex-ui-go/commits/34a190f))
- Fix request format ([#f7f8775](https://github.com/edgexfoundry/edgex-ui-go/commits/f7f8775))
- Fix wrong url spell ([#38a7ce0](https://github.com/edgexfoundry/edgex-ui-go/commits/38a7ce0))
- Exchange interval and interval action in all responses interface ([#e4b6b14](https://github.com/edgexfoundry/edgex-ui-go/commits/e4b6b14))
- Can't select device profile ([#02320a7](https://github.com/edgexfoundry/edgex-ui-go/commits/02320a7))
- Profile editor save button not work sometimes ([#31d26ff](https://github.com/edgexfoundry/edgex-ui-go/commits/31d26ff))

<a name="v1.3.0"></a>
## [v1.3.0] - 2020-11-18

### Bug Fixes 🐛
- Replace broken link in pull request template ([#3403b5c](https://github.com/edgexfoundry/edgex-ui-go/commits/3403b5c))

<a name="v1.2.1"></a>
## [v1.2.1] - 2020-06-12

<a name="v1.2.0"></a>
## [v1.2.0] - 2020-05-14

### Features ✨
- Extend configuration for edgex services to include uri/path.

<a name="v1.1.0"></a>
## [v1.1.0] - 2019-11-18

<a name="0.1.1"></a>
## 0.1.1 - 2018-11-16
