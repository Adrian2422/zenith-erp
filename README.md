# Zenith-erp

## Development

### Working with keycloak-events [Docs](https://github.com/p2-inc/keycloak-events)

To create a webhook you need to:

1. Enable the extension in Realm Settings -> Events
2. Create a client with the appropriate roles
3. Send an http POST to set the webhook with this client

### Export and import keycloak realm

```bash
# Run in config/keycloak directory
# Based on https://github.com/keycloak/keycloak/issues/33800#issuecomment-2411056817
export KEYCLOAK_ID=$(docker ps -a | grep keycloak | awk '{print $1}')

docker exec -it KEYCLOAK_ID sh -c "cp -rp /opt/keycloak/data/h2 /tmp; /opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/export --users different_files --realm zenith-realm --db dev-file --db-url 'jdbc:h2:file:/tmp/h2/keycloakdb;NON_KEYWORDS=VALUE'"
docker exec -it KEYCLOAK_ID cat /opt/keycloak/data/export/zenith-realm-realm.json > zenith-realm-realm.json
docker exec -it KEYCLOAK_ID cat /opt/keycloak/data/export/zenith-realm-users-0.json > zenith-realm-users-0.json
```
