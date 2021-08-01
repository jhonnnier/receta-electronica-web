import {FinanciadorDTO} from '../dtos/FinanciadorDTO';

export interface ConsultaTrabajadorInterface {
    financiador?: FinanciadorDTO;
    nombres?: string;
    apellidos?: string;
    tipoDocumento?: string;
    numeroDocumento?: string;
    siniestro?: string;
    page?: number;
    size?: number;
    property?: string;
    direction?: string;
}
