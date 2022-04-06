/**
 * using this pacakge: https://github.com/coreybutler/node-windows
 * 
 * npm install -g node-windows
 * npm link node-windows
 */

const Service = require('node-windows').Service;
const path = require('path')
const appPath = path.join(__dirname, './app.js')

// Create a new service object
const svc = new Service({
  name:'TaaghcheTelegramApiProxy',
  description: 'The nodejs.org example web server.',
  script: appPath,
  // workingDirectory: '',
  // allowServiceLogon: true
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function() {
  svc.start()
})

svc.install()