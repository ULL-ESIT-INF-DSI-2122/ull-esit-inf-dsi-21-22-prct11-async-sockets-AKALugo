import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {Cliente} from '../../src/cliente/cliente';
import {EventEmitterCliente} from '../../src/cliente/eventEmitterCliente';

describe('EventEmitterCliente', () => {
    it('Debería emitir una respuesta', (done) => {
      const socket = new EventEmitter();
      const auxEventEmitterCliente = new EventEmitterCliente(socket);

      auxEventEmitterCliente.on('respuesta', (message) => {
        expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
        done();
      });
  
      socket.emit('data', '{"type": "change", "prev": 13');
      socket.emit('data', ', "curr": 26}');
      socket.emit('data', '\n');
    });
  });