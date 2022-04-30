import {EventEmitter} from "events";
import {ResponseType} from "../peticiones";

export default class EventEmitterCliente extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let informacion = '';
    connection.on('data', (datos) => {
      informacion += datos;

      let limite: number = informacion.indexOf('\n');

      while (limite !== -1) {
        const respuesta: ResponseType = JSON.parse(informacion.substring(0, limite));
        informacion = informacion.substring(limite + 1);
        this.emit('respuesta', respuesta);
        limite = informacion.indexOf('\n');
      }
    });
  }
}
