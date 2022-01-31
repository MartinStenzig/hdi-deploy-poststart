'use strict'

const env = require('./environment')
const hanaClient = require('@sap/hana-client')

module.exports = {

  /**
   * Processes the SQL statements that were passed in the array
   * @param {Array} sqlStatements an array of SQL statements
   */
  runStatements (sqlStatements) {
    const hanaCreds = env.getHanaCredentials()

    // Creates the connection but not connected yet
    const hanaConnection = hanaClient.createConnection()

    // Initializes the promise chain
    let promiseChain = Promise.resolve()

    // Establishes the connection to HANA database
    hanaConnection.connect(hanaCreds, (err) => {
      // Error if the connection could not be established
      if (err) throw err

      // Loop through the SQL statements
      for (const sqlStatement of sqlStatements) {
        // Attach the sql stement exectution to the promise chain
        promiseChain = promiseChain.then(() =>
          this.execSqlStatement(hanaConnection, sqlStatement)
        )
      }

      // Attach the disconnect as last piece in the promise chain
      promiseChain = promiseChain.then(() => {
        // console.log('disconnecting...')
        hanaConnection.disconnect()
      })
    })
  },

  /**
   * Executes the specified SQL statement against the connection passed in as parameter
   * @param {Object} hanaConnection The connection to the HANA database
   * @param {String} sqlStatement The SQL statement to be executed
   * @returns {Object} The result of the SQL statement executionß
   */
  execSqlStatement (hanaConnection, sqlStatement) {
    return new Promise((resolve, reject) => {
      console.log('Exec SQL: ', sqlStatement)

      hanaConnection.exec(sqlStatement, (err, result) => {
        if (err) reject(err)
        else {
          console.table(result)
          resolve(result)
        }
      })
    })
  }

}
