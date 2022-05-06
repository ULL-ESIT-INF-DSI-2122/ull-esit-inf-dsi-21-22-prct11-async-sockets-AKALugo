import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {EventEmitterCliente} from '../../src/cliente/eventEmitterCliente';

describe('EventEmitterCliente', () => {
    it('Debería emitir una respuesta', (done) => {
      const socket = new EventEmitter();
      const auxEventEmitterCliente = new EventEmitterCliente(socket);

      auxEventEmitterCliente.on('respuesta', (message) => {
        expect(message).to.be.eql({'type': 'add', 'success': false});
        done();
      });
  
      socket.emit('data', '{"type": "add"');
      socket.emit('data', ', "success": false}');
      socket.emit('data', '\n');
    });
  });