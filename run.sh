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
  echo "Usage: ./run.sh <compose script> <command>"
  exit 1
fi

# Construct the base command
cmd="docker-compose -f "$composedir/$1.yml" --project-directory ."

# Start or stop the given compose script
case "$2" in
  "up")
    $cmd up -d
    ;;
  "upsync")
    $cmd up
    ;;
  "down")
    $cmd down -v
    ;;
  "restart")
    $cmd restart
    ;;
  *)
    echo "Second parameter must be a command: up, upsync, down, or restart"
    echo "Usage: ./run.sh <compose script> <command>"
    ;;
esac
