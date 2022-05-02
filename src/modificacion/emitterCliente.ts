import {EventEmitter} from "events";
import {ModificacionClienteType} from "../peticiones";

/**
 * @class EventEmitterCliente
 */
export class EventEmitterCliente extends EventEmitter {
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
        const respuesta: ModificacionClienteType = JSON.parse(informacion.substring(0, limite));
        informacion = informacion.substring(limite + 1);
        this.emit('respuesta', respuesta);
        limite = informacion.indexOf('\n');
      }
    });
  }
}
