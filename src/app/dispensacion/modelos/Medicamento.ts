import {FrecuenciaMedicamento} from '../../dtos/FrecuenciaMedicamento';

export class Medicamento {
  monodroga: string;
  presentacion: string;
  nombre: string;
  cantidadDosis: number;
  cantidadEnvases: number;
  active: boolean;
  cantidadFrecuencia: number;
  codigoBarra: string;
  codigoForma: number;
  codigoLaboratorio: number;
  codigoMonodroga: number;
  dosisMedicamento: string;
  forma: string;
  frecuenciaMedicamento: FrecuenciaMedicamento;
  id: string;
  indicaciones: string;
  laboratorio: string;
  numeroRegistro: number;
  ordenMedicamento: number;
  precio: number;
  troquel: string;
  version: number;
}
