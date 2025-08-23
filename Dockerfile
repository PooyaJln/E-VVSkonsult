FROM mysql:8.0.42

COPY ./db/init /docker-entrypoint-initdb.d