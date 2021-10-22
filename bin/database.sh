#!/bin/bash

command=$1
container_name=ignite-challenge-database-queries 

if [[ -z $command ]]; then
  echo "Usage:"
  echo "  $0 [ create | start | stop ]"
fi

if [[ $command == 'create' ]]; then
  echo "Creating and starting $container_name in detached mode"

  docker run --name $container_name \
    -e POSTGRES_DB=queries_challenge \
    -e POSTGRES_PASSWORD=docker \
    -p 5432:5432 \
    -d postgres
fi

if [[ $command == 'start' ]]; then
  echo "Starting $container_name"

  docker start $container_name
fi

if [[ $command == 'stop' ]]; then
  echo "Stopping $container_name"

  docker stop $container_name
fi