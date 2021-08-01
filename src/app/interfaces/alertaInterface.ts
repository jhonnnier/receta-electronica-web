import { AlertaMaestroInterface } from './alertaMaestroInterface';

export interface AlertaInterface {
    id?: string,
    numeroRegistro?: number,
    nombreMedicamento?: string,
    numeroRegistroComparado1?: number,
    nombreMedicamentoComparado1?: string,
    descripcionInteraccionMedicamentosa?: string,
    codigoDiagnostico?: string;
    descripcionDiagnostico?: string;
    alertaMaestro: AlertaMaestroInterface;
    tipo: string;
    frecuencia?: string;
}
