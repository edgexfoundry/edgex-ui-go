package handler

import (
	"encoding/json"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
	"github.com/edgexfoundry/go-mod-registry/v2/pkg/types"
	"github.com/edgexfoundry/go-mod-registry/v2/registry"
)

func GetRegisteredServiceAll(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	client, err := makeConsulClient()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	endpoints, err := client.GetAllServiceEndpoints()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := json.Marshal(endpoints)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=UTF-8")
	w.Write(result)
}

func makeConsulClient() (registry.Client, error) {
	registryConfig := types.Config{
		Host:          configs.RegistryConf.Host,
		Port:          configs.RegistryConf.Port,
		CheckInterval: "2s",
		CheckRoute:    "/api/v1/ping",
		Type:          "consul",
	}
	return registry.NewRegistryClient(registryConfig)
}
