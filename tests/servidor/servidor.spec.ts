import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {Servidor} from '../../src/servidor/servidor';
import {EventEmitterServidor} from '../../src/servidor/eventEmitterServidor';

describe('EventEmitterServidor', () => {
    it('Debería emitir una peticion', (done) => {
      const socket = new EventEmitter();
      const auxEventEmitterServidor = new EventEmitterServidor(socket);

      auxEventEmitterServidor.on('peticion', (message) => {
        expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
        done();
      });
  
      socket.emit('data', '{"type": "change", "prev": 13');
      socket.emit('data', ', "curr": 26}');
      socket.emit('data', '\n');
    });
  });