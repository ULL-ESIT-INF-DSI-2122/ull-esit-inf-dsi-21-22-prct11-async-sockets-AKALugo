import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {Servidor} from '../../src/modificacion/servidor';
import {EventEmitterServidor} from '../../src/modificacion/emitterServidor';

describe('EventEmitterServidor', () => {
    it('Debería emitir una peticion', (done) => {
      const socket = new EventEmitter();
      const auxEventEmitterServidor = new EventEmitterServidor(socket);

      auxEventEmitterServidor.on('peticion', (message) => {
        expect(message).to.be.eql({"comando": "ls", "opciones": ["-ld"], "ruta": "src"});
        done();
      });
  
      socket.emit('data', '{"comando": "ls", "opciones": ["-ld"]');
      socket.emit('data', ', "ruta": "src"}');
      socket.emit('data', '\n');
    });
  });