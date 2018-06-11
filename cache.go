package main

import (

)

//{Token:User}
var TokenCache = make(map[string]User,20)

//{gatewayID:Gateway}
var GatewayInfoCache = make([]Gateway,0)

//target ProxyCache {token:targetIP}
var DynamicalProxyCache = make(map[string]string,10)

//{token:MqttClient}
var ExportSubscriberCache = make(map[string]interface{},10)
