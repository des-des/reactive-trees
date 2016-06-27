const publicServer = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: { defaultExtension: "js", path: 'public', listing: true }
    }
  })
  
  next()
}

publicServer.attributes = {
  name: 'publicServer'
}

module.exports = { register: publicServer }
