# hdi-deploy-poststart
[![npm version](https://badge.fury.io/js/hdi-deploy-poststart.svg)](https://badge.fury.io/js/exec-below)
[![npm downloads](https://img.shields.io/npm/dm/hdi-deploy-poststart)](https://www.npmjs.com/package/exec-below)

This module provides a library that can be used as poststart script for the @sap/hdi-deploy library.

It executes all commands in files containes in the /poststart directory.

## Example package.json
```json
{
    "name": "deploy",
    "dependencies": {
        "@sap/hdi-deploy": "^4.*",
        "@martinstenzig/hdi-deploy-poststart": "^1.*"
    },
    "scripts": {
        "start": "node node_modules/@sap/hdi-deploy/deploy.js",
        "ppoststart": "npx @martinstenzig/hdi-deploy-poststart" 
    }
}
```

## Processing Steps
The poststart script will follow these steps: 
1. Find all files in the /poststart directory
2. Parse content of each file and assemble an array of SQL statements
3. Use the hana binding provided through one of the following to connect to the HANA instance
    1. Online through an environment variable 
    2. Offline through a file like default-env.json
    3. Offline through a file like .env
4. Execute all SQL statements sequentially and output its result to console.
