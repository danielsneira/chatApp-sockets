import {mensajes} from '../app.js'

const socketController = (socket) => {
	console.log("cliente conectado ", socket.id);

	socket.on("disconnect", () => {
		console.log("cliente desconectado", socket.id);
	});

	socket.on("enviar-mensaje", (payload, callback) =>{
    mensajes.push(payload)
    callback(mensajes)
    socket.broadcast.emit('mensaje-servidor', payload)
  })

  socket.on('clear-mensajes', (payload, callback) =>{
    mensajes.length = 0
    callback('mensajes limpiados')
  })

  socket.on('get-mensajes', (payload, callback) => {
    callback(mensajes)
  })
};

export { socketController };
