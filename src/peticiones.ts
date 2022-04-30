import {colorType} from "./notas/nota";
import {Nota} from "./notas/nota";

export type RequestType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    user: string;
    title?: string;
    body?: string;
    color?: colorType;
  }
  
export type ResponseType = {
    type: 'add' | 'modify' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: Nota[];
  }
