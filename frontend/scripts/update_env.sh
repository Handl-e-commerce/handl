#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <path_to_env_file> <new_uri>"
    exit 1
fi

# Get the arguments
ENV_FILE=$1
NEW_URI=$2

# Check if the .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: File '$ENV_FILE' not found."
    exit 1
fi

# Use sed to replace the value of REACT_APP_SERVER_URI
if grep -q '^REACT_APP_SERVER_URI=' "$ENV_FILE"; then
    sed -i.bak "s|^REACT_APP_SERVER_URI=.*|REACT_APP_SERVER_URI=$NEW_URI|" "$ENV_FILE"
    echo "Updated REACT_APP_SERVER_URI in $ENV_FILE."
else
    echo "REACT_APP_SERVER_URI not found in $ENV_FILE. Adding it to the file."
    echo "REACT_APP_SERVER_URI=$NEW_URI" >> "$ENV_FILE"
fi

# Notify user of completion
echo "Operation completed. A backup file has been created as $ENV_FILE.bak."
