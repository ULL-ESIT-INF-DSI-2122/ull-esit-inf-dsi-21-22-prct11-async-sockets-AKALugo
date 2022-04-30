import {EventEmitter} from "events";
import {RequestType} from "../peticiones";

export class EventEmitterServidor extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let informacion = '';
    connection.on('data', (datos) => {
      informacion += datos;

      let limite: number = informacion.indexOf('\n');

      while (limite !== -1) {
        const peticion: RequestType = JSON.parse(informacion.substring(0, limite));
        informacion = informacion.substring(limite + 1);
        this.emit('peticion', peticion);
        limite = informacion.indexOf('\n');
      }
    });
  }
}
