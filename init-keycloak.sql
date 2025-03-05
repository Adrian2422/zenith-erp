-- Tworzenie użytkownika Keycloak (jeśli nie istnieje)
DO
$do$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'keycloak_user') THEN
      CREATE ROLE keycloak_user WITH LOGIN PASSWORD 'keycloak_pass';
    END IF;
  END
$do$;

-- Tworzenie bazy danych Keycloak (jeśli nie istnieje)
-- UWAGA: Musi być osobnym poleceniem poza blokiem DO!
SELECT 'CREATE DATABASE keycloak OWNER keycloak_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloak')\gexec
