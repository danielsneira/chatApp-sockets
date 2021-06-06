const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		ready: false,
		messages: [{}],
		serverStatus: "offline",
		txtMensaje: "",
		id: "",
		days: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		],
	},
	created() {
		socket.on("connect", () => {
			this.serverStatus = "online";
			console.log("Conectado");
			this.getMensajes();
		});

		socket.on("disconnect", () => {
			this.serverStatus = "offline";
			console.log("Desconectado");
		});

		socket.on("mensaje-servidor", (payload) => {
			this.messages.push(payload);
		});
	},
	computed: {
		totalMessages() {
			if (this.messages.length > 10) {
				this.messages.shift();
			}
			return this.messages.length;
		},
	},

	methods: {
		send() {
      if(this.txtMensaje.length > 0){
			const d = new Date();
			const mensaje = this.txtMensaje;
			const payload = {
				message: mensaje,
				id: this.id,
				fecha:
					this.days[d.getDay()] + " " + d.getHours() + ":" + d.getMinutes(),
			};
			this.messages.push(payload);

			socket.emit("enviar-mensaje", payload, (data) => {
				this.messages = data;
			});
			this.txtMensaje = "";}
		},
		clear() {
      if(confirm('borrar mensajes?')){
      this.messages.length = 0
      const payload = this.messages
      socket.emit('clear-mensajes', payload, (data) => {
        console.log(data)
      })}
      this.txtMensaje = " ";
    },
    checkId(){
      if(this.id.length > 2){
        this.ready=true
      }
    },
		getMensajes() {
			let payload = "";
			socket.emit("get-mensajes", payload, (data) => {
				this.messages = data;
			});
		},
	},
});
