#!/bin/bash

composedir="./compose"

# Check if we're root and re-execute if we're not.
if [ $(id -u) != "0" ]; then
  sudo bash "$0" "$@"  # Modified as suggested below.
  exit $?
fi

# Make sure a script to run was named
if [ -z "$1" ]; then
  echo "First parameter must be the name of a compose script in $composedir without the .yml"
  echo "Usage: ./log.sh <compose script> <optional service name>"
  exit 1
fi

# Showcase the selected logs
if [ -z "$2" ]; then
  docker-compose -f "$composedir/$1.yml" --project-directory . logs
else
  docker-compose -f "$composedir/$1.yml" --project-directory . logs "$2"
fi
