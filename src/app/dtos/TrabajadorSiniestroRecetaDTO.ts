import { AfiliadoDTO } from './AfiliadoDTO';
import { SiniestroDTO } from './SiniestroDTO';

export class TrabajadorSiniestroRecetaDTO {
    afiliado: AfiliadoDTO;
    siniestro: SiniestroDTO;

    constructor(afiliado: AfiliadoDTO, siniestro: SiniestroDTO) {
        this.afiliado = afiliado;
        this.siniestro = siniestro;
    }
}
