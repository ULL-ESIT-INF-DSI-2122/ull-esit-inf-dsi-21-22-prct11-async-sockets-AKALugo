import * as net from "net";
import {argv} from "process";
import {ModificacionServidorType, ModificacionClienteType} from "../peticiones";
import {EventEmitterCliente} from "./emitterCliente";

/**
 * @class Cliente
 */
export class Cliente {
  /**
   * Constructor
   * @param puerto puerto por el cual comunicarse con el servidor.
   */
  constructor(private readonly puerto: number) {}

  /**
   * 
   * Metodo que ejecuta al cliente.
   * @param peticion Peticion a realizar al servidor
   */
  run(argumentos: string[]) {
    if (argumentos.length < 4) {
      console.log("No se ha introducido ninguna peticion!");
    } else {
      const peticion: ModificacionServidorType = {comando: argumentos[2], opciones: [], 
        ruta: argumentos[argumentos.length - 1]};

      for (let i = 3; i < argumentos.length; i++) {
        peticion.opciones.push(argumentos[i]);
      }

      const cliente = net.connect({port: this.puerto});
      const emitter = new EventEmitterCliente(cliente);
  
      
      emitter.on("respuesta", (respuesta: ModificacionServidorType) => {
        console.log(respuesta);
      });
  
      cliente.write(JSON.stringify(peticion) + "\n", (err) => {
        if (err) {
          console.log("Ha ocurrido un error con la petición!");
        }
      });
    }
  }
}

const cliente = new Cliente(60300);
cliente.run(argv);
