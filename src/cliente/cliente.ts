import * as net from "net";
import {Nota} from "../notas/nota";
import {ResponseType, RequestType} from "../peticiones";
import {EventEmitterCliente} from "./eventEmitterCliente";
const chalk = require("chalk");

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
   * Metodo que ejecuta al cliente.
   * @param peticion Peticion a realizar al servidor
   */
  run(peticion: RequestType) {
    const cliente = net.connect({port: this.puerto});
    const emitter = new EventEmitterCliente(cliente);

    emitter.on("respuesta", (respuesta: ResponseType) => {
      switch (respuesta.type) {
        case "add":
          if (respuesta.success) {
            console.log(chalk.green("¡Nueva nota añadida!"));
          } else {
            console.log(chalk.red("¡ERROR, ya existe una nota con ese título!"));
          }
          break;
        case "remove":
          if (respuesta.success) {
            console.log(chalk.green("¡Nota eliminada!"));
          } else if (respuesta.notes) {
            const notaObjeto = new Nota(respuesta.notes[0].titulo, respuesta.notes[0].cuerpo, respuesta.notes[0].color);
            console.log(chalk.red(`¡ERROR, no se ha encontrado la nota ${notaObjeto.getTitulo()}!`));
          }
          break;
        case "modify":
          if (respuesta.success) {
            console.log(chalk.green("¡Nota modificada!"));
          } else if (respuesta.notes) {
            const notaObjeto = new Nota(respuesta.notes[0].titulo, respuesta.notes[0].cuerpo, respuesta.notes[0].color);
            console.log(chalk.red(`¡ERROR, no se ha encontrado la nota ${notaObjeto.getTitulo()}!`));
          }
          break;
        case "list":
          if (respuesta.notes) {
            respuesta.notes.forEach((nota) => {
              const notaObjeto = new Nota(nota.titulo, nota.cuerpo, nota.color);
              console.log(chalk.keyword(notaObjeto.getColor())(notaObjeto.getTitulo()));
            });
          } else {
            console.log(chalk.red("¡ERROR, hubo un problema con el nombre del usuario o el usuario no tiene notas!"));
          }
          break;
        case "read":
          if (respuesta.notes) {
            const notaObjeto = new Nota(respuesta.notes[0].titulo, respuesta.notes[0].cuerpo, respuesta.notes[0].color);
            console.log(chalk.keyword(notaObjeto.getColor())(notaObjeto.getTitulo()));
            console.log(chalk.keyword(notaObjeto.getColor())(notaObjeto.getCuerpo()));
          }
          break;
      }
    });
    cliente.write(JSON.stringify(peticion) + "\n", (err) => {
      if (err) {
        console.log("Ha ocurrido un error con la petición!");
      }
    });
  }
}
