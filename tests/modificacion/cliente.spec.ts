import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {EventEmitterCliente} from '../../src/modificacion/emitterCliente';

describe('EventEmitterCliente', () => {
    it('Debería emitir una respuesta', (done) => {
      const socket = new EventEmitter();
      const auxEventEmitterCliente = new EventEmitterCliente(socket);

      auxEventEmitterCliente.on('respuesta', (message) => {
        expect(message).to.be.eql({"resultado": "El comando cat se ejecuto correctamente"});
        done();
      });
  
      socket.emit('data', '{"resultado": "El comando c');
      socket.emit('data', 'at se ejecuto correctamente"}\n');
    });
  });