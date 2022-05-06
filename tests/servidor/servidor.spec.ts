import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {EventEmitterServidor} from '../../src/servidor/eventEmitterServidor';

describe('EventEmitterServidor', () => {
    it('Debería emitir una peticion', (done) => {
      const socket = new EventEmitter();
      const auxEventEmitterServidor = new EventEmitterServidor(socket);

      auxEventEmitterServidor.on('peticion', (message) => {
        expect(message).to.be.eql({'type': 'add', 'user': 'ale', 'title': 'Nota roja'});
        done();
      });
  
      socket.emit('data', '{"type": "add", "user": ');
      socket.emit('data', '"ale", "title": "Nota roja"');
      socket.emit('data', '}\n');
    });
  });