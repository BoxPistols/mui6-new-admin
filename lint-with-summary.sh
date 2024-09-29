#!/bin/bash

# Run Biome lint and capture the output
output=$(bun biome lint ./src)

# Extract warnings and errors
warnings=$(echo "$output" | grep -c "warning")
errors=$(echo "$output" | grep -c "error")

# Print the full output
echo "$output"

# Print the summary
echo "------------------------------"
echo "Lint Summary:"
echo "Warnings: $warnings"
echo "Errors: $errors"

# Exit with non-zero status if there are errors
if [ "$errors" -gt 0 ]; then
  exit 1
fi
