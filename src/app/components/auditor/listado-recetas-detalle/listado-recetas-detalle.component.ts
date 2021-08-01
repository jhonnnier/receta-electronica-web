import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConsultaAuditorInterface } from 'src/app/interfaces/consultaAuditorInterface';
import { AuditorService } from 'src/app/pages/auditor/services/auditor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-recetas-detalle',
  templateUrl: './listado-recetas-detalle.component.html',
  styleUrls: ['./listado-recetas-detalle.component.scss']
})
export class ListadoRecetasDetalleComponent implements AfterViewInit {

  private unsubscribe$ = new Subject<void>();

  constructor(private auditorService: AuditorService,
              private router: Router) { }

  displayedColumns: string[] = ['numReceta', 'estado', 'prescripta', 'prestador', 'siniestro', 'docTrabajador'];
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
    const objConsulta = {} as ConsultaAuditorInterface;
    // tslint:disable-next-line: deprecation
    this.auditorService.getRecetas(true, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      if(res != null) {
        this.totalRecords = res.totalElements;
        this.totalPages = res.totalPages;
        this.dataSource = new MatTableDataSource(res.contentList);
      } else {
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
      const objConsulta = {} as ConsultaAuditorInterface;
      objConsulta.page = 0;
      objConsulta.size = this.paginator.pageSize;
      this.auditorService.getRecetas(true, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
          this.dataSource.data = res.contentList;
          this.dataSource._updateChangeSubscription();
          this.totalRecords = res.totalElements;
          this.totalPages = res.totalPages;
      });
    } else {
      this.useSort = true;
      let objConsulta: ConsultaAuditorInterface = JSON.parse(localStorage.getItem('objBusquedaAuditorReceta'));
      if (objConsulta === null) {
        objConsulta = {} as ConsultaAuditorInterface;
      }
      if (sort.active.toUpperCase() === 'ESTADO') {
        objConsulta.property = 'PRIORIDAD';
      } else {
        objConsulta.property = sort.active.toUpperCase();
      }
      objConsulta.direction = sort.direction.toUpperCase();
      if (this.pageEventVerify) {
        objConsulta.page = 0;
        objConsulta.size = this.paginator.pageSize;
        // tslint:disable-next-line: deprecation
        this.auditorService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
          this.dataSource.data = res.contentList;
          this.dataSource._updateChangeSubscription();
          this.totalRecords = res.totalElements;
          this.totalPages = res.totalPages;
        });
      } else {
        // tslint:disable-next-line: deprecation
        this.auditorService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
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
    let objConsulta: ConsultaAuditorInterface = JSON.parse(localStorage.getItem('objBusquedaAuditorReceta'));
    if (objConsulta === null) {
      objConsulta = {} as ConsultaAuditorInterface;
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
    this.auditorService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.dataSource.data = res.contentList;
      this.totalRecords = res.totalElements;
    });
  }

  verDetalleReceta(id: string) {
    this.auditorService.setRecetaId(id);
    this.router.navigateByUrl('/pages/auditor/verDetalleAuditor');
  }

}
