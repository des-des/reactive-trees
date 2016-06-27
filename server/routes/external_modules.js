const moduleServer = (server, options, next) => {
  server.route([{
    method: 'GET',
    path: '/rxjs',
    handler: { file: 'node_modules/rx/dist/rx.all.js' }
  }, {
    method: 'GET',
    path: '/jquery',
    handler: { file: 'node_modules/jquery/dist/jquery.js' }
  }, {
    method: 'GET',
    path: '/d3',
    handler: { file: 'node_modules/d3/d3.js' }
  }])

  next()
}

moduleServer.attributes = {
  name: 'moduleServer'
}

module.exports = { register: moduleServer }
