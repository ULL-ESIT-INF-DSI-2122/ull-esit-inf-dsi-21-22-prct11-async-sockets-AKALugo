import * as net from "net";
import {ResponseType, RequestType} from "../peticiones";
const chalk = require("chalk");

import EventEmitterCliente from "./eventEmitterCliente";

export class Cliente {
  constructor(private readonly puerto: number) {}

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
            console.log(chalk.red(`¡ERROR, no se ha encontrado la nota ${respuesta.notes[0].getTitulo()}!`));
          }
          break;
        case "modify":
          if (respuesta.success) {
            console.log(chalk.green("¡Nota modificada!"));
          } else if (respuesta.notes) {
            console.log(chalk.red(`¡ERROR, no se ha encontrado la nota ${respuesta.notes[0].getTitulo()}!`));
          }
          break;
        case "list":
          if (respuesta.notes) {
            respuesta.notes.forEach((nota) => {
              console.log(chalk.keyword(nota.getColor())(nota.getTitulo()));
            });
          } else {
            console.log(chalk.red("¡ERROR, hubo un problema con el nombre del usuario o el usuario no tiene notas!"));
          }
          break;
        case "read":
          if (respuesta.notes) {
            console.log(chalk.keyword(respuesta.notes[0].getColor())(respuesta.notes[0].getTitulo()));
            console.log(chalk.keyword(respuesta.notes[0].getColor())(respuesta.notes[0].getCuerpo()));
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
