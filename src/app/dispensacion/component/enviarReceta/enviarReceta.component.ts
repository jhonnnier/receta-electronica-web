import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispensacionService } from '../../service/dispensacion.service'

@Component({
  selector: 'app-enviar-receta',
  templateUrl: './enviarReceta.component.html',
  styleUrls: ['./enviarReceta.component.scss']
})
export class EnviarRecetaComponent implements OnInit {

  public bCorreo = true;
  public correoInvalido = false;
  public searchForm: FormGroup;
  public idReceta: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<EnviarRecetaComponent>,
               private fb: FormBuilder,
               private dispensacionService: DispensacionService) { 
      
    this.searchForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });

  }

  ngOnInit(): void {
    this.idReceta =  this.data.idReceta;
  }

  cerrarModal(valor: boolean): void{
    this.dialogRef.close({confirmar: valor});
  }

  confirmar(): void {
    this.correoInvalido = false;

    if(!this.bCorreo && this.searchForm.valid) {
      this.dispensacionService.enviarReceta(this.idReceta, this.searchForm.controls['correo'].value).subscribe(resp => {
        this.cerrarModal(true);
      });
    }else{
      this.correoInvalido = true;
    }
  }

  regresar(): void {
    this.cerrarModal(false);
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.searchForm.controls[controlName].hasError(errorCode);
  }

  get formControls(): any {
    return this.searchForm.controls;
  }
}
