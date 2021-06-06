import {} from 'dotenv/config'
import {Server} from './models/server.js';

const server = new Server();
const mensajes = []

server.listen();

export {mensajes}