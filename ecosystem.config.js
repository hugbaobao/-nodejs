'use strict'

module.exports = {
  apps: [{
    name: 'my-server',
    script: './app.js',
    env_production: {
      NODE_ENV: 'production',
      EGG_SERVER_ENV: 'prod',
    },
  }],
}

