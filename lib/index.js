'use strict'

const hana = require('./hana')
const statements = require('./statements')
const STATEMENT_DIRECTORY = './poststart/'


statements.determineStatementsToProcess(STATEMENT_DIRECTORY)
  .then((statementArray) => {

    //console.log('Statement Array: ', statementArray)
    hana.runStatements(statementArray)
  })


//console.log('Hello World')