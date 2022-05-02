import {spawn} from "child_process";
import * as net from "net";
import {ModificacionClienteType, ModificacionServidorType} from "../peticiones";
import {EventEmitterServidor} from "./emitterServidor";

/**
 * @class Servidor
 */
export class Servidor {
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

      emitter.on("peticion", (peticion: ModificacionServidorType) => {
        console.log("Peticion recibida: " + peticion.comando);
        const respuesta: ModificacionClienteType = {resultado: ""};
        
        const comando = spawn(peticion.comando, peticion.opciones);

        comando.stdout.on("data", (data) => {
          respuesta.resultado += data;
        });

        comando.on('error', () =>{
          respuesta.resultado = "Error al ejecutar el comando, comando erroneo o no existe";
        });

        comando.stderr.on("data", (data) => {
          console.log("Error: " + data);
          respuesta.resultado += data;
        });

        comando.on("close", (data) => {
          console.log("Enviando respuesta");
          connection.write(JSON.stringify(respuesta) + "\n", (err) => {
            if (err) {
              console.log("Ha ocurrido un error con la petición!");
            }
            connection.end();
          });
        });
      });
    }).listen(this.puerto, () => {
      console.log(`Servidor escuchando en el puerto ${this.puerto}`);
    });
  }
}

const servidor = new Servidor(60300);
servidor.run();
