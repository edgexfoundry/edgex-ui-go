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

package component

import (
	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/edgexfoundry/edgex-ui-go/web/app/domain"
	"log"
	"strconv"
)

const (
	ClientIDPrefix = "edgex-go-"
)

var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	log.Printf("TOPIC: %s\n", msg.Topic())
	WsClientSend(MqttTokenCache, msg.Payload())
}
var MqttTokenCache string

//{token:MqttClient}
var ExportSubscriberCache = make(map[string]interface{}, 10)

func CreateMqttClient(addressable domain.Addressable, token string) {
	MqttTokenCache = token
	broker := addressable.Protocol + "://" + addressable.Address + ":" + strconv.Itoa(addressable.Port)
	opts := MQTT.NewClientOptions().AddBroker(broker)
	opts.SetClientID(ClientIDPrefix + addressable.Topic)
	opts.SetUsername(addressable.User)
	opts.SetPassword(addressable.Password)

	opts.OnConnect = func(c MQTT.Client) {
		if t := c.Subscribe(addressable.Topic, 0, f); t.Wait() && t.Error() != nil {
			panic(t.Error())
		}
	}

	client := MQTT.NewClient(opts)

	if t := client.Connect(); t.Wait() && t.Error() != nil {
		panic(t.Error())
	} else {
		log.Println("Connected to mqtt server")
	}

	ExportSubscriberCache[token+addressable.Topic] = client
}
