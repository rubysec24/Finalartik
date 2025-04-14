#!/bin/bash

# Remove canvas if it exists
npm uninstall canvas || true

# Run the build
npm run build 