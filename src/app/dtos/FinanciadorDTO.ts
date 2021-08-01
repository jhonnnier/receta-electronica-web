import { AfiliadoDTO } from './AfiliadoDTO';

export class FinanciadorDTO {
    id: number;
    cantidadMaximaAfiliadosFront: number;
    cantidadAfiliados: number;
    afiliados: Array<AfiliadoDTO>;
    version: number;
    active: boolean;
    valorMaximoMedicamento: number;
    razonSocial: string;

    constructor(id: number, cantMaximaAfiliadosFront: number,
                cantAfiliados: number, afiliadosDtos: Array<AfiliadoDTO>) {
        this.id = id;
        this.cantidadMaximaAfiliadosFront = cantMaximaAfiliadosFront;
        this.cantidadAfiliados = cantAfiliados;
        this.afiliados = afiliadosDtos;
    }
}
