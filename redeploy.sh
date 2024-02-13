cd ~/git/github/dovholuknf/edgex/clean/edgex-compose
docker compose stop ui
docker compose rm -f ui

docker images -q "edgexfoundry/edgex-ui:*" | xargs docker rmi -f
docker images -q "edgexfoundry/edgex-web-ui:*" | xargs docker rmi -f

cd ~/git/github/dovholuknf/edgex/clean/edgex-ui-go/web
rm -r dist/web/
make build

cd ~/git/github/dovholuknf/edgex/clean/edgex-ui-go
make web
make docker

echo "Update docker compose with image: edgexfoundry/edgex-ui:0.0.0-dev"

cd ~/git/github/dovholuknf/edgex/clean/edgex-compose
docker compose up -d ui
docker compose logs -f ui