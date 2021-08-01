import { SiniestroDTO } from './SiniestroDTO';
import { FinanciadorDTO } from './FinanciadorDTO';

export class AfiliadoDTO {
    id: number;
    tipoDocumento: string;
    documento: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    sexo: string;
    email: string;
    telefono: string;
    nombreCompleto: string;
    siniestros: Array<SiniestroDTO>;
    financiador: FinanciadorDTO;

    constructor(id: number, tipoDocumento: string, documento: string, nombres: string,
                apellidos: string, fechaNacimiento: string, sexo: string, email: string,
                telefono: string, nombreCompleto: string, siniestrosDtos: Array<SiniestroDTO>) {
        this.id = id;
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.sexo = sexo;
        this.email = email;
        this.telefono = telefono;
        this.nombreCompleto = nombreCompleto;
        this.siniestros = siniestrosDtos;
    }
}
