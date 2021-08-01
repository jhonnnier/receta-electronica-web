import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConsultaTrabajadorInterface } from 'src/app/interfaces/consultaTrabajadorInterface';
import { RecetaService } from 'src/app/services/receta/receta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-detalle-receta',
  templateUrl: './consulta-detalle-receta.component.html',
  styleUrls: ['./consulta-detalle-receta.component.scss']
})
export class ConsultaDetalleRecetaComponent implements AfterViewInit {

  private unsubscribe$ = new Subject<void>();

  constructor(private recetaService: RecetaService,
              private router: Router) { }

  displayedColumns: string[] = ['apellidos', 'nombres', 'tipoDocumento', 'numReceta', 'estado', 'numero_siniestro', 'fechaReceta'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public sinResultado: boolean;
  public limpiarResultado = true;
  public totalRecords: 0;
  public totalPages: 0;
  public pageIndex: number;
  public currentPage = 0;
  public pageSize = 10;
  public useSort = false;
  private pageEventVerify: PageEvent;

  ngAfterViewInit(): void {
    this.useSort = false;
    this.primerCargueRecetas();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private primerCargueRecetas(): void {
    const objConsulta = {} as ConsultaTrabajadorInterface;
    this.recetaService.getRecetas(true, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      if(res != null) {
        this.totalRecords = res.totalElements;
        this.totalPages = res.totalPages;
        this.dataSource = new MatTableDataSource(res.contentList);
      }else {
        this.totalRecords = 0;
        this.totalPages = 0;
        this.dataSource = new MatTableDataSource([]);
        this.sinResultado = true;
      }      
      setTimeout(() => {
        this.establecerTabla();
      });
    });
  }

  getListado(recetaTrabajadorDTO: any): void {
    if (recetaTrabajadorDTO && recetaTrabajadorDTO.contentList) {
      this.totalRecords = recetaTrabajadorDTO.totalElements;
      this.totalPages = recetaTrabajadorDTO.totalPages;
      this.dataSource = new MatTableDataSource(recetaTrabajadorDTO.contentList);
    } else {
      this.dataSource = new MatTableDataSource([]);
    }
    setTimeout(() => {
      this.paginator.firstPage();
      this.establecerTabla();
    });
  }

  private establecerTabla(): void {
    this.dataSource.sort = this.sort;
    if (this.paginator !== undefined && this.paginator._intl !== undefined) {
      this.paginator._intl.itemsPerPageLabel = 'Mostrar';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number) => {
        const start = page * pageSize + 1;
        let end = (page + 1) * pageSize;
        if (end > this.totalRecords) {
          end = this.totalRecords;
        }
        return `${start} - ${end} de ${this.totalRecords} recetas`;
      };
      this.paginator.length = this.totalRecords;
      this.paginator.pageSize = 20;
      this.paginator.pageSizeOptions = [10, 20];
    }
  }

  sortData(sort: Sort): void {
    this.sort.direction = sort.direction;
    this.sort.active = sort.active;
    if (sort.direction === '') {
      this.useSort = false;
      const objConsulta = {} as ConsultaTrabajadorInterface;
      // tslint:disable-next-line: deprecation
      this.recetaService.getRecetas(true, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
          this.dataSource.data = res.contentList;
          this.dataSource._updateChangeSubscription();
          this.totalRecords = res.totalElements;
          this.totalPages = res.totalPages;
      });
    } else {
      this.useSort = true;
      let objConsulta: ConsultaTrabajadorInterface = JSON.parse(localStorage.getItem('objBusquedaReceta'));
      if (objConsulta === null) {
        objConsulta = {} as ConsultaTrabajadorInterface;
      }
      if (sort.active.toUpperCase() === 'ESTADO') {
        objConsulta.property = 'PRIORIDAD';
      } else {
        objConsulta.property = sort.active.toUpperCase();
      }
      objConsulta.direction = sort.direction.toUpperCase();
      if (this.pageEventVerify) {
        if (this.dataSource.data.length === this.totalRecords) {
          objConsulta.page = 0;
          objConsulta.size = this.totalRecords;
          // tslint:disable-next-line: deprecation
          this.recetaService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
            this.dataSource.data = res.contentList;
            this.dataSource._updateChangeSubscription();
            this.totalRecords = res.totalElements;
            this.totalPages = res.totalPages;
          });
        }
      } else {
        // tslint:disable-next-line: deprecation
        this.recetaService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
          this.dataSource.data = res.contentList;
          this.dataSource._updateChangeSubscription();
          this.totalRecords = res.totalElements;
          this.totalPages = res.totalPages;
        });
      }
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageEventVerify = event;
    let objConsulta: ConsultaTrabajadorInterface = JSON.parse(localStorage.getItem('objBusquedaReceta'));
    if (objConsulta === null) {
      objConsulta = {} as ConsultaTrabajadorInterface;
    }
    if (this.useSort) {
      if (this.sort.active.toUpperCase() === 'ESTADO') {
        objConsulta.property = 'PRIORIDAD';
      } else {
        objConsulta.property = this.sort.active.toUpperCase();
      }
      objConsulta.direction = this.sort.direction.toUpperCase();
    }
    objConsulta.size = event.pageSize;
    objConsulta.page = event.pageIndex;
    // tslint:disable-next-line: deprecation
    this.recetaService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.dataSource.data = res.contentList;
      this.totalRecords = res.totalElements;
    });
  }

  verDetalleReceta(id: string) {
    this.recetaService.setRecetaId(id);
    this.router.navigateByUrl('/pages/receta/verDetalle');
  }

}
