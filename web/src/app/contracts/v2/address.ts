export interface Address extends RESTAddress, MQTTPubAddress {
    type: string, //REST, MQTT, EMAIL
    host: string, //required
    port: number, //required
    emailAddresses: string[]
}

interface RESTAddress {
    path: string,
    queryParameters: string,
    httpMethod: string //required,'GET' 'HEAD' 'POST' 'PUT' 'DELETE' 'TRACE' 'CONNECT'
}

interface MQTTPubAddress {
    publisher: string, //required
    topic: string, //required
    qos: number,
    keepAlive: number,
    retained: boolean,
    autoReconnect: boolean,
    connectTimeout: number
}
