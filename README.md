# hdi-deploy-poststart
[![npm version](https://badge.fury.io/js/hdi-deploy-poststart.svg)](https://badge.fury.io/js/exec-below)
[![npm downloads](https://img.shields.io/npm/dm/hdi-deploy-poststart)](https://www.npmjs.com/package/exec-below)

This module provides a library that can be used as poststart script for the [@sap/hdi-deploy](https://www.npmjs.com/package/@sap/hdi-deploy) library.

It executes all commands in files contained in the /poststart directory.


## Purpose
The deployment to HANA should sometimes be succeeded by one or multiple actions. 
Example: HANA offers the functionality to specify replication tasks. Those replication tasks offer the capability to replicate information from other data sources (i.e. ODATA). A classic example is the replication of the SuccessFactors EmpJoj entity. Even though a procedure is created to kick start the synchronization, it is not automatically executed on deployment. This approach allows the execution of SQL statements after the regular deploymemnt concluded.

## Usage
1. Install the library in your database deployment project via `npm install hdi-deploy-poststart`
2. Modify your your deployment project's **package.json**: 
    1. Add a "poststart" script to file with the command "npx hdi-deploy-poststart"
3. Create a subdirectory with the name 'poststart' in your deployment project's root directory.
4. Place your file containing your SQL statements with i.e. the name 'statements.sql' into the poststart directory

### Sample package.json
THe hdi-deploy package support 'prestart' and 'poststart' scripts. The 'poststart' script is executed after the deployment is finished and utilized in this example to execute SQL statements. 
```json
{
    "name": "deploy",
    "dependencies": {
        "@sap/hdi-deploy": "^4",
        "hdi-deploy-poststart": "^1"
    },
    "scripts": {
        "start": "node node_modules/@sap/hdi-deploy/deploy.js",
        "poststart": "npx hdi-deploy-poststart" 
    }
}
```

### Sample .sql file 
All files in the /poststart directory are parsed and assumed to be in SQL format. SQL statements must be separated by ';'. An example SQL file would look like this: 
```sql  
CALL "sf_synchronys.START_REPLICATION"();
select count(*) from tables;
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
