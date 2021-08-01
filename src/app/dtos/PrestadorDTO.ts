export class PrestadorDTO {
    cuit: string;
    razonSocial: string;
    domicilio: string;
    localidad: string;
    provincia: string;
    correoElectronico: string;

    constructor(cuit: string, razonSocial: string, domicilio: string, localidad: string, provincia: string, correoElectronico: string) {
        this.cuit = cuit;
        this.razonSocial = razonSocial;
        this.domicilio = domicilio;
        this.localidad = localidad;
        this.provincia = provincia;
        this.correoElectronico = correoElectronico;
    }
}
