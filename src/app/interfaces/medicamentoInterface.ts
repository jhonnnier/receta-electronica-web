import { MedicamentoDTO } from '../dtos/MedicamentoDTO';
import {FrecuenciaMedicamento} from '../dtos/FrecuenciaMedicamento';

export interface MedicamentoInterface {
    ind?: number;
    medicamento: MedicamentoDTO;
    cantDosis: number;
    presentacion: string;
    cantFrecuencia: number;
    frecuencia: string;
    cantidadMedto: number;
    indicaciones: string;
    frecuenciaDescripcion: string;
}
