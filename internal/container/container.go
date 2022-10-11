package container

import (
	"github.com/edgexfoundry/edgex-ui-go/internal/config"
	"github.com/edgexfoundry/go-mod-bootstrap/v2/di"
)

// ConfigurationName contains the name of command's config.ConfigurationStruct implementation in the DIC.
var ConfigurationName = di.TypeInstanceToName(config.ConfigurationStruct{})

// ConfigurationFrom helper function queries the DIC and returns command's config.ConfigurationStruct implementation.
func ConfigurationFrom(get di.Get) *config.ConfigurationStruct {
	return get(ConfigurationName).(*config.ConfigurationStruct)
}
