#!/bin/bash

while true; do
  #node take-picture.js
  node take-screenshot.js
  node show-active-window.js
  sleep 120  # Sleep for 2 minutes
done

