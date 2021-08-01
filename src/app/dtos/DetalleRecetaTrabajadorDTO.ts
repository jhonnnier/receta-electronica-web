import { DiagnosticoDTO } from './DiagnosticoDTO';
import { MedicamentoDTO } from './MedicamentoDTO';
import { SiniestroDTO } from './SiniestroDTO';
import { PrestadorDTO } from './PrestadorDTO';

export class DetalleRecetaTrabajadorDTO {
    id: string;
    version: number;
    active: boolean;
    numeroReceta: string;
    codigoBarras: string;
    codigoQR: string;
    fechaCreacion: Date;
    fechaExpiracion: Date;
    fechaDispensacion: Date;
    estadoReceta: any;
    correoNotificacion: string;
    tipoTratamiento: string;
    medicamentos: Array<MedicamentoDTO>;
    medico: any;
    diagnosticos: Array<DiagnosticoDTO>;
    siniestro: any;
    observacionAuditoria: string;
    prestador: PrestadorDTO; 

    constructor(id: string, version: number, active: boolean, numeroReceta: string,
                codigoBarras: string, codigoQR: string, fechaCreacion: Date, fechaExpiracion: Date,
                fechaDispensacion: Date, estadoReceta: string, correoNotificacion: string, tipoTratamiento: string,
                medicamentos: Array<MedicamentoDTO>, medico: any, diagnosticos: Array<DiagnosticoDTO>,
                siniestro: SiniestroDTO, ) {
        this.id = id;
        this.version = version;
        this.active = active;
        this.numeroReceta = numeroReceta;
        this.codigoBarras = codigoBarras;
        this.codigoQR = codigoQR;
        this.fechaCreacion = fechaCreacion;
        this.fechaExpiracion = fechaExpiracion;
        this.fechaDispensacion = fechaDispensacion;
        this.estadoReceta = estadoReceta;
        this.correoNotificacion = correoNotificacion;
        this.tipoTratamiento = tipoTratamiento;
        this.medicamentos = medicamentos;
        this.medico = medico;
        this.diagnosticos = diagnosticos;
        this.siniestro = siniestro;
    }
}
