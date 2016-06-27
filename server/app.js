const Hapi = require('hapi')
const attachSocket = require('socket.io')

const server = new Hapi.Server()

const port = process.env.PORT || 4000

server.connection({ port })

server.register([require('inert'), ...require('./routes/')], err => {
  if (err) console.error(err)
})

server.start(err => {
  if (err) return console.error(err)

  console.log(`server listening on port ${port}`)

  const io = attachSocket(server.listener)

  io.on('connection', (socket) => {
    console.log('connection!')
    socket.on('click', data => io.emit('click', data))
  })
})
