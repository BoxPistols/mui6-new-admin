#!/bin/bash

# Run Biome lint and capture the output
output=$(bun biome lint ./src)

# Extract the total number of errors and warnings
# errors=$(echo "$output" | grep -oP 'Found \K\d+(?= errors\.)')
# warnings=$(echo "$output" | grep -oP 'Found \K\d+(?= warnings\.)')

errors=$(echo "$output" | sed -n 's/Found \([0-9]*\) errors\./\1/p')
warnings=$(echo "$output" | sed -n 's/Found \([0-9]*\) warnings\./\1/p')


# Set to 0 if empty
if [ -z "$warnings" ]; then
  warnings=0
fi

if [ -z "$errors" ]; then
  errors=0
fi

# Print the full output
echo "------------------------------"
echo "$output"

# Print the summary
echo "------------------------------"
# echo "Lint Summary:"
# echo "Warnings: $warnings"
# echo "Errors: $errors"

# Exit with non-zero status if there are errors
if [ "$errors" -gt 0 ]; then
  exit 1
fi
