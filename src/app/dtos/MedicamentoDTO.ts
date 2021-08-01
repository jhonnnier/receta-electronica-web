import {FrecuenciaMedicamento} from './FrecuenciaMedicamento';

export class MedicamentoDTO {

    troquel: number;
    nombre: string;
    presentacion: string;
    cantidadEnvases: number;
    laboratorio: string;
    precio: number;
    codigoLaboratorio: number;
    numeroRegistro: number;
    codigoBarra: number;
    monodroga: string;
    codigoMonodroga: string;
    forma: string;
    codigoForma: number;
    // Atributos para detalleReceta
    id?: string;
    version?: number;
    active?: boolean;
    dosisMedicamento?: string;
    cantidadDosis?: number;
    frecuenciaMedicamento?: FrecuenciaMedicamento;
    cantidadFrecuencia?: number;
    indicaciones?: string;
    ordenMedicamento?: number;

    constructor(troquel: number, nombre: string, presentacion: string,
                cantidadEnvases: number, laboratorio: string, precio: number, codigoLaboratorio: number,
                numeroRegistro: number, codigoBarra: number, monodroga: string, codigoMonodroga: string,
                forma: string, codigoForma: number) {
        this.troquel = troquel;
        this.nombre = nombre;
        this.presentacion = presentacion;
        this.cantidadEnvases = cantidadEnvases;
        this.laboratorio = laboratorio;
        this.precio = precio;
        this.codigoLaboratorio = codigoLaboratorio;
        this.numeroRegistro = numeroRegistro;
        this.codigoBarra = codigoBarra;
        this.monodroga = monodroga;
        this.codigoMonodroga = codigoMonodroga;
        this.forma = forma;
        this.codigoForma = codigoForma;
    }
}
