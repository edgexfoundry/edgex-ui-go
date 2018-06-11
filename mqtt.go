package main

import (
  "fmt"
  "strconv"
  MQTT "github.com/eclipse/paho.mqtt.golang"
)

var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
  fmt.Printf("TOPIC: %s\n", msg.Topic())
  //fmt.Printf("MSG: %s\n", string(msg.Payload()))
  WsClientSend(MqttTokenCache,msg.Payload())
}
var MqttTokenCache string
func CreateMqttClient(addressable Addressable,token string){
  MqttTokenCache = token
  broker := addressable.Address + ":" + strconv.Itoa(addressable.Port)
  opts := MQTT.NewClientOptions().AddBroker(broker)
  opts.SetClientID("edgex-go-" + addressable.Topic)
  opts.SetUsername(addressable.User)
  opts.SetPassword(addressable.Password)
  //opts.SetDefaultPublishHandler(f)

  opts.OnConnect = func(c MQTT.Client) {
    if t := c.Subscribe(addressable.Topic, 0, f); t.Wait() && t.Error() != nil {
            panic(t.Error())
    }
  }

  client := MQTT.NewClient(opts)

  if t := client.Connect(); t.Wait() && t.Error() != nil {
    panic(t.Error())
  } else {
    fmt.Printf("Connected to mqtt server\n")
  }

  ExportSubscriberCache[token + addressable.Topic] = client

}
