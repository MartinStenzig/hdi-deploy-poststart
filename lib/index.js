'use strict'

const hana = require('./hana')
const statements = require('./statements')
const STATEMENT_DIRECTORY = './poststart/'

module.exports = {

  /**
   * Main entry point for poststart
   */
  processSqlCommands () {
    // Determines the SQL statements to be processed
    statements.determineStatementsToProcess(STATEMENT_DIRECTORY)
      .then((statementArray) => {
        // Executes the SQL statements
        hana.runStatements(statementArray)
      })
  }
}
