import { AfiliadoDTO } from './AfiliadoDTO';

export class SiniestroDTO {
    id: number;
    numeroSiniestro: string;
    fechaSiniestro: Date;
    descripcion: string;
    estado: string;
    afiliadoDto: AfiliadoDTO;
    afiliado: AfiliadoDTO;

    constructor(id: number, numero: string, fechaSiniestro: Date, descripcion: string,
                estado: string, afiliadoDto: AfiliadoDTO) {
        this.id = id;
        this.numeroSiniestro = numero;
        this.fechaSiniestro = fechaSiniestro;
        this.descripcion = descripcion;
        this.estado = estado;
        this.afiliadoDto = afiliadoDto;
    }
}
