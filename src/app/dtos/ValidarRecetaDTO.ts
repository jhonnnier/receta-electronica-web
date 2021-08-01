import { AlertaInterface } from '../interfaces/alertaInterface';
import { ValidarDxInterface } from '../interfaces/validarDxInterface';
import { ValidarMedInterface } from '../interfaces/validarMedInterface';
import { ValidarSiniestroInterface } from '../interfaces/validarSiniestroInterface';

export class ValidarRecetaDTO {

    medicamentos?: Array<ValidarMedInterface>;
    diagnosticos?: Array<ValidarDxInterface>;
    siniestro?: ValidarSiniestroInterface;
    alertas?: Array<AlertaInterface>;

    constructor(medicamentos: Array<ValidarMedInterface>, diagnosticos: Array<ValidarDxInterface>,
                siniestro: ValidarSiniestroInterface) {
        this.medicamentos = medicamentos;
        this.diagnosticos = diagnosticos;
        this.siniestro = siniestro;
    }
}
