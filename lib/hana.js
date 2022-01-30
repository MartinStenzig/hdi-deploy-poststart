'use strict'

const env = require('./environment')
const hana_client = require('@sap/hana-client')

module.exports = {



  execSqlStatement(conn, sqlStatement) {
    return new Promise((resolve, reject) => {

      console.log('Exec SQL: ', sqlStatement)


      conn.exec(sqlStatement, (err, result) => {
        if (err) reject(err)
        else {

          console.table(result)
          resolve(result)


        }
      })


    })

  },


  runStatements(sqlStatements) {

    let hanaCreds = env.getHanaCredentials()

    // Creates the connection but not connected yet
    let conn = hana_client.createConnection();

    let promiseChain = Promise.resolve()

    conn.connect(hanaCreds, (err) => {

      // Error if the connection could not be established
      if (err) throw err

      for (let sqlStatement of sqlStatements) {

        promiseChain = promiseChain.then(() => 
          this.execSqlStatement(conn, sqlStatement)
        )
      }

      promiseChain = promiseChain.then(() => {
        console.log('disconnecting...')
        conn.disconnect()
      })



    });

    //console.log('Hello World from scripts', sqlStatements, hanaCreds)
    console.log('Script exec')
    // need disconnect
  }

  
}
