#!/bin/bash
docker-compose -f test/docker/docker-compose.yml kill
docker-compose -f test/docker/docker-compose.yml rm -f
docker-compose -f test/docker/docker-compose.yml build
docker-compose -f test/docker/docker-compose.yml up -d
docker-compose -f test/docker/docker-compose.yml run wait
sleep 10
