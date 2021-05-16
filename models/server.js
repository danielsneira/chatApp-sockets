import express from "express";
import cors from "cors";
import * as io from "socket.io";
import http from "http";
import {socketController} from "../sockets/controller.js";

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = http.createServer(this.app);
		this.io = new io.Server(this.server);
		this.middlewares();
		this.sockets();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.static("public"));
	}

  sockets() {
    this.io.on('connection',socketController);
  }

	listen() {
		this.server.listen(this.port, () => {
			console.log(`servidor corriendo en el puerto ${this.port}`);
		});
	}
}

export {Server};
