'use strict'

const xsenv = require('@sap/xsenv')
const fs = require('fs')
const dotenv = require('dotenv')

module.exports = {

  /**
   * Determines the HANA credentials based on the enironment information
   * @returns {Object} HANA credentials/connection parameters
   */
  getHanaCredentials () {
    // Prepare environment
    this.prepareEnvironemt()

    // Get HANA service credentials based on the environment information
    const svc = xsenv.serviceCredentials({ label: 'hana' })

    // Asemble the HANA connection parameters
    const connectionParameters = {
      serverNode: svc.host + ':' + svc.port,
      uid: svc.user,
      pwd: svc.password,
      currentSchema: svc.schema
    }

    // Return the connection parameters
    return connectionParameters
  },

  /**
   * Parepares the environment variables based on various development environent approaches
   */
  prepareEnvironemt () {
    const SAP_DEFAULT_ENV = './default-env.json'
    const SAP_DEFAULT_SVC = './default-services.json'
    const DOT_ENV = './.env'

    if (fs.existsSync(DOT_ENV)) {
      console.log('Load environment from ' + DOT_ENV)
      dotenv.config()
    } else if (fs.existsSync(SAP_DEFAULT_ENV)) {
      console.log('Load environment from ' + SAP_DEFAULT_ENV)
      xsenv.loadEnv()
    } else if (fs.existsSync(SAP_DEFAULT_SVC)) {
      console.log('Load environment from ' + SAP_DEFAULT_SVC)
      xsenv.loadEnv(SAP_DEFAULT_SVC)
    }
  }

}
