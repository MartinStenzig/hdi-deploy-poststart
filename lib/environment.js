'use strict'

const xsenv = require('@sap/xsenv');

module.exports = {

  getHanaCredentials() {

    // Prepare environment
    this.prepareEnvironemt()

    var svc = xsenv.serviceCredentials({ tag: 'hana' })

    //console.log('Hana credentials: ', svc)

    var conn_params = {
      serverNode: svc.host + ':' + svc.port,
      uid: svc.user,
      pwd: svc.password
    };

    return conn_params;


  },
  prepareEnvironemt() {

    console.log('Load default environment if existing...')
    xsenv.loadEnv()

  }

}