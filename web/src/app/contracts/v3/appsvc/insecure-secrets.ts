export interface InsecureSecrets {
    DB: DB,
    mqtt: mqtt,
    http: http,
    AES: AES
}

export interface DB {
    Path: string, //redisdb
    Secrets: DBSecrets
}

export interface DBSecrets {
    username: string,
    password: string
}

export interface mqtt {
    Path: string, //mqtt
    Secrets: mqttSecrets
}

export interface mqttSecrets {
    username: string,
    password: string,
    cacert: string,
    clientcert: string,
    clientkey: string
}

export interface http {
    Path: string, //http
    Secrets: httpSecrets
}

export interface httpSecrets {
    headervalue: string
}

export interface AES {
    Path: string, //aes
    Secrets: AESSecrets
}

export interface AESSecrets {
    key: string
}