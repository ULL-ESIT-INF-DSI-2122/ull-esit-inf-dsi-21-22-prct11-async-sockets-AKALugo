import {GestionNota} from '../notas/gestionNota';
import {Cliente} from './cliente';
import * as yargs from 'yargs';
const chalk = require("chalk");

const cliente = new Cliente(60300);

/**
 * Comando que permite añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' && 
        (argv.color === 'red' || argv.color === 'green' || argv.color === 'blue'||
        argv.color === 'yellow')) {
      cliente.run({type: "add", user: argv.user, title: argv.title, body: argv.color, color: argv.color});
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite modificar una nota.
 */
yargs.command({
  command: 'modify',
  describe: 'Modifica una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' && 
        (argv.color === 'red' || argv.color === 'green' || argv.color === 'blue'||
        argv.color === 'yellow')) {
      cliente.run({type: "modify", user: argv.user, title: argv.title, body: argv.color, color: argv.color});
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite leer una nota
 */
yargs.command({
  command: 'read',
  describe: 'Lee una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      cliente.run({type: "read", user: argv.user, title: argv.title});
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite listarlas notas
 */
yargs.command({
  command: 'list',
  describe: 'Lista todas las notas',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      console.log(chalk.underline('El usuario ' + argv.user + ' tiene las siguientes notas:'));
      cliente.run({type: "list", user: argv.user});
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite borrar una nota.
 */
yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      cliente.run({type: "remove", user: argv.user, title: argv.title});
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

yargs.parse();
