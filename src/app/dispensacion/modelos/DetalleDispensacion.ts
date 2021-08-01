import {Medicamento} from './Medicamento';

export class DetalleDispensacion {
  numeroReceta: string;
  fechaCreacion: Date;
  fechaCreacionConvertida: string;
  medicamentosDtos: Medicamento[];
}
