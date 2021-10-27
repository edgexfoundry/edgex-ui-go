package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/edgexfoundry/edgex-ui-go/internal/common"
	"github.com/edgexfoundry/edgex-ui-go/internal/configs"
	"github.com/edgexfoundry/go-mod-registry/v2/pkg/types"
	"github.com/edgexfoundry/go-mod-registry/v2/registry"
)

const (
	Authorization   = "Authorization"
	AclOfConsulPath = "/consul/v1/acl/token/self"
)

func GetRegisteredServiceAll(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var err error
	var token string
	var code int
	if common.IsSecurityEnabled() {
		token, err, code = getAclTokenOfConsul(w, r)
		if err != nil || code != http.StatusOK {
			http.Error(w, "unable to get consul acl token", code)
			return
		}
	}
	client, err := makeConsulClient(token)
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

func makeConsulClient(token string) (registry.Client, error) {
	registryConfig := types.Config{
		Host:          configs.RegistryConf.Host,
		Port:          configs.RegistryConf.Port,
		CheckInterval: "2s",
		CheckRoute:    "/api/v1/ping",
		Type:          "consul",
		AccessToken:   token,
	}
	return registry.NewRegistryClient(registryConfig)
}

func getAclTokenOfConsul(w http.ResponseWriter, r *http.Request) (string, error, int) {
	defer r.Body.Close()
	var acl struct{ SecretID string }
	client := &http.Client{}
	url := fmt.Sprintf("http://%s:%d%s", configs.GetConfigs().Kong.Server, configs.GetConfigs().Kong.ApplicationPort, AclOfConsulPath)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return "", err, http.StatusInternalServerError
	}
	req.Header.Set(Authorization, r.Header.Get(Authorization))
	resp, err := client.Do(req)
	if err != nil {
		return "", err, resp.StatusCode
	}
	if err := json.NewDecoder(resp.Body).Decode(&acl); err != nil {
		return "", err, http.StatusInternalServerError
	}
	if resp.StatusCode != http.StatusOK {
		return "", errors.New(""), resp.StatusCode
	}
	return acl.SecretID, nil, resp.StatusCode
}
