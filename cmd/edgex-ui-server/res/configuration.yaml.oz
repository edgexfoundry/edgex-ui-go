Writable:
    LogLevel: INFO
Service:
    Host: localhost
    Port: 4000
    ServerBindAddr: ''
    StartupMsg: edgex-ui-go service started
    HealthCheckInterval: 10s
    MaxRequestSize: 0
    RequestTimeout: 5s
    SecurityOptions:
        Mode: ""
        OpenZitiController: "openziti:1280"
        OpenZitiServiceName: "edgex.ui"
        OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
    CORSConfiguration:
        EnableCORS: true
        CORSAllowCredentials: false
        CORSAllowedOrigin: "https://*.edgex.ziti"
        CORSAllowedMethods: "GET, POST, PUT, PATCH, DELETE"
        CORSAllowedHeaders: "Authorization, Accept, Accept-Language, Content-Language, Content-Type, X-Correlation-ID"
        CORSExposeHeaders: "Cache-Control, Content-Language, Content-Length, Content-Type, Expires, Last-Modified, Pragma, X-Correlation-ID"
        CORSMaxAge: 3600
Clients:
    core-data:
        Protocol: http
        Host: "core-data.edgex.ziti"
        Port: 80
        SecurityOptions:
            Mode: ""
            OpenZitiController: "openziti:1280"
            OpenZitiServiceName: "edgex.core-data"
            OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
            OpenZitiAuthTokenFile: "/tmp/edgex/secrets/ui.token.json"
    core-metadata:
        Protocol: http
        Host: "core-metadata.edgex.ziti"
        Port: 80
        SecurityOptions:
            Mode: ""
            OpenZitiController: "openziti:1280"
            OpenZitiServiceName: "edgex.core-metadata"
            OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
            OpenZitiAuthTokenFile: "/tmp/edgex/secrets/ui.token.json"
    core-command:
        Protocol: http
        Host: "core-command.edgex.ziti"
        Port: 80
        SecurityOptions:
            Mode: ""
            OpenZitiController: "openziti:1280"
            OpenZitiServiceName: "edgex.core-command"
            OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
            OpenZitiAuthTokenFile: "/tmp/edgex/secrets/ui.token.json"
    support-notifications:
        Protocol: http
        Host: "support-notifications.edgex.ziti"
        Port: 80
        SecurityOptions:
            Mode: ""
            OpenZitiController: "openziti:1280"
            OpenZitiServiceName: "edgex.support-notifications"
            OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
            OpenZitiAuthTokenFile: "/tmp/edgex/secrets/ui.token.json"
    support-scheduler:
        Protocol: http
        Host: "support-scheduler.edgex.ziti"
        Port: 80
        SecurityOptions:
            Mode: ""
            OpenZitiController: "openziti:1280"
            OpenZitiServiceName: "edgex.support-scheduler"
            OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
            OpenZitiAuthTokenFile: "/tmp/edgex/secrets/ui.token.json"
    rules-engine:
        Protocol: http
        Host: "rules-engine.edgex.ziti"
        Port: 80
        SecurityOptions:
            Mode: ""
            OpenZitiController: "openziti:1280"
            OpenZitiServiceName: "edgex.rules-engine"
            OpenZitiIdentityFile_: "/mnt/v/temp/curlz.json"
            OpenZitiAuthTokenFile: "/tmp/edgex/secrets/ui.token.json"
Registry:
    Host: localhost
    Port: 8500
    Type: consul
    ConfigRegistryStem: edgex/
    ServiceVersion: 'v3'
APIGateway:
    Server: localhost
    ApplicationPort: 8000
    ApplicationPortSSL: 8443
