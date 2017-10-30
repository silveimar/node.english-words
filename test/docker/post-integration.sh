#!/bin/sh
docker-compose -f test/docker/docker-compose.yml kill
echo "docker logs:"
docker-compose -f test/docker/docker-compose.yml logs --no-color
docker-compose -f test/docker/docker-compose.yml rm -f
