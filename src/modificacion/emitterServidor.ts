import {EventEmitter} from "events";
import {ModificacionServidorType} from "../peticiones";

/**
 * @class EventEmitterServidor
 */
export class EventEmitterServidor extends EventEmitter {
  /**
   * Constructor
   * @param connection Objeto eventEmiter para poder actuar segun el evento recibido.
   */
  constructor(connection: EventEmitter) {
    super();

    let informacion = '';
    connection.on('data', (datos) => {
      informacion += datos;

      let limite: number = informacion.indexOf('\n');

      while (limite !== -1) {
        const peticion: ModificacionServidorType = JSON.parse(informacion.substring(0, limite));
        informacion = informacion.substring(limite + 1);
        this.emit('peticion', peticion);
        limite = informacion.indexOf('\n');
      }
    });
  }
}
