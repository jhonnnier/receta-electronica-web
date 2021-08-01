import { UsuarioDTO } from 'src/app/dtos/UsuarioDTO';
import {EstadoRecetaRequest} from './EstadoRecetaRequest';

export interface RechazarRecetaRequest {
  id: string;
  observacionAuditoria: string;
  estadoReceta?: EstadoRecetaRequest;
  usuarioDto?: UsuarioDTO;
}
