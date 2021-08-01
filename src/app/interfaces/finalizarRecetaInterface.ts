import { AlertaInterface } from './alertaInterface';
import { UsuarioDTO } from '../dtos/UsuarioDTO';

export interface FinalizarRecetaInterface {
    correoNotificacion: string;
    tipoTratamiento: string;
    medicamentos: Array<any>;
    medico: {};
    diagnosticos: Array<string>;
    siniestro: {};
    alertasReceta: Array<AlertaInterface>;
    usuarioDto: UsuarioDTO;
}
