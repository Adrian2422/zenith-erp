#!/bin/sh
echo "Setting webhooks..."

PAYLOAD="{
           \"enabled\": \"true\",
           \"url\": \"${KEYCLOAK_EVENTS_TARGET_URL}/api/keycloak-events\",
           \"secret\": \"${KEYCLOAK_EVENTS_SECRET}\",
           \"eventTypes\": [
             \"*\"
           ]
         }"

wget --header "Content-Type: application/json" \
     --post-data "$PAYLOAD" \
     "${KEYCLOAK_URL}/realms/zenith-realm/webhooks"
