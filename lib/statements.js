'use strict'

const fs = require('fs')

module.exports = {

  /**
   * Determines all SQL statements by parsing all SQL files in the poststart directory
   * @param {String} directory containing the statements .sql files
   * @returns {Array} containing all statements to be executed
   */
  determineStatementsToProcess (directory) {
    const statementArray = []
    const sqlStatementRegex = /;/g

    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          reject(err)
        } else {
          // loop through all files
          for (const file of files) {
            // synchroneously read the file
            const fileContent = fs.readFileSync(directory + file, 'utf8')

            // parse the file content and determine applicable SQL statements
            const localArray = fileContent
              .split(sqlStatementRegex)
              .map((x) => {
                return x.replaceAll('\n', '').replaceAll('\r', '').trim()
              })
              .filter(function (element) {
                if (element !== undefined && element !== null && element !== '') {
                  return true
                } else {
                  return false
                }
              })
            // Add the statements to the statement array
            statementArray.push(...localArray)
          }

          // resolve the promise
          resolve(statementArray)
        }
      })
    })
  }

}
