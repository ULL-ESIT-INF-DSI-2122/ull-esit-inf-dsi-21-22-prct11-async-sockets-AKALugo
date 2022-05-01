import * as net from "net";
import {ResponseType, RequestType} from "../peticiones";
import {EventEmitterServidor} from "./eventEmitterServidor";
import {GestionNota} from "../notas/gestionNota";

/**
 * @class Servidor
 */
export class Servidor {
  private manejador = new GestionNota();
  /**
   * Constructor
   * @param puerto puerto de escucha
   */
  constructor(private readonly puerto: number) {}

  /**
   * Método que pone al servidor a escuchar en un puerto y a recibir peticiones-
   */
  run() {
    net.createServer((connection) => {
      const emitter = new EventEmitterServidor(connection);
      emitter.on("peticion", (peticion: RequestType) => {
        const respuesta: ResponseType = {type: peticion.type, success: false};

        switch (peticion.type) {
          case "add":
            if (peticion.title && peticion.body && peticion.color) {
              if (this.manejador.añadirNota(peticion.user, peticion.title, peticion.body, peticion.color)) {
                respuesta.success = true;
              } 
            }
            break;
          case "remove":
            if (peticion.title) {
              if (this.manejador.eliminarNota(peticion.user, peticion.title)) {
                respuesta.success = true;
              } 
            }
            break;
          case "modify":
            if (peticion.title && peticion.body && peticion.color) {
              if (this.manejador.modificarNota(peticion.user, peticion.title, peticion.body, peticion.color)) {
                respuesta.success = true;
              } 
            }
            break;
          case "list":
            const aux = this.manejador.listarNotas(peticion.user);
            respuesta.success = aux.exito;
            respuesta.notes = aux.notas;
            break;
          case "read":
            if (peticion.title) {
              const aux = this.manejador.leerNota(peticion.user, peticion.title);
              respuesta.success = aux.exito;
              respuesta.notes = aux.nota;
            }
            break;
        }
        
        connection.write(JSON.stringify(respuesta) + "\n", (err) => {
          if (err) console.log("Hubo un problema al enviar la respuesta");
        });
      });
    }).listen(this.puerto, () => {
      console.log(`Servidor escuchando en el puerto ${this.puerto}`);
    });
  }
}
