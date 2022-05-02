import {colorType} from "./notas/nota";
import {Nota} from "./notas/nota";

/**
 * @type RequestType
 */
export type RequestType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: colorType;
  }

/**
 * @type ResponseType
 */
export type ResponseType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Nota[];
  }

/**
 * @type ModificacionServidorType
 */
export type ModificacionServidorType = {
  comando: string;
  opciones: string[];
  ruta: string;
}

/**
 * @type ModificacionClienteType
 */
export type ModificacionClienteType = {
  resultado: string;
}
