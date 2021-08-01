import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AfiliadoDTO } from 'src/app/dtos/AfiliadoDTO';
import { FinanciadorDTO } from 'src/app/dtos/FinanciadorDTO';
import { TrabajadorSiniestroService } from 'src/app/services/afiliado/trabajador-siniestro.service';

@Component({
  selector: 'app-consulta-detalle',
  templateUrl: './consulta-detalle.component.html',
  styleUrls: ['./consulta-detalle.component.scss']
})
export class ConsultaDetalleComponent implements AfterViewInit {

  constructor(private router: Router, private trabajadorSiniestroService: TrabajadorSiniestroService){}

  displayedColumns: string[] = ['nombre', 'tipoDocumento', 'siniestro', 'acciones'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public sinResultado: boolean;
  public limpiarResultado = true;
  public totalRegistros = 0;

  ngAfterViewInit(): void {
    this.establecerTabla();
    this.totalRegistros = 0;
  }

  getListado(financiadorDTO: FinanciadorDTO): void {
    if (financiadorDTO && financiadorDTO.afiliados) {
      this.totalRegistros = financiadorDTO.cantidadAfiliados;
      this.dataSource = new MatTableDataSource(financiadorDTO.afiliados);
      setTimeout(() => {
        this.establecerTabla();
      }, 0);
    } else {
      this.dataSource = new MatTableDataSource([]);
      this.totalRegistros = 0;
      setTimeout(() => {
        this.establecerTabla();
      }, 0);
    }
  }

  private establecerTabla(): void {
    this.dataSource.sort = this.sort;
    if (this.paginator !== undefined && this.paginator._intl !== undefined) {
      this.paginator._intl.itemsPerPageLabel = 'Mostrar';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        const start = page * pageSize + 1;
        let end = (page + 1) * pageSize;
        if (end > this.totalRegistros) {
          end = this.totalRegistros;
        }
        return `${start} - ${end} de ${length} trabajadores`;
      };
      this.dataSource.paginator = this.paginator;
    }
  }

  public setTrabajadorSiniestro(afiliadoDTO: AfiliadoDTO): void {
    this.trabajadorSiniestroService.setTrabajadorSiniestro(afiliadoDTO);
    this.router.navigate(['pages/trabajadorSiniestro']);
  }
}
