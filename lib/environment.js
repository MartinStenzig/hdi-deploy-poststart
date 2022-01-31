'use strict'

const xsenv = require('@sap/xsenv')

module.exports = {

  getHanaCredentials () {
    // Prepare environment
    this.prepareEnvironemt()

    const svc = xsenv.serviceCredentials({ tag: 'hana' })

    // console.log('Hana credentials: ', svc)

    const connectionParameters = {
      serverNode: svc.host + ':' + svc.port,
      uid: svc.user,
      pwd: svc.password
    }

    return connectionParameters
  },
  prepareEnvironemt () {
    console.log('Load default environment if existing...')
    xsenv.loadEnv()
  }

}
