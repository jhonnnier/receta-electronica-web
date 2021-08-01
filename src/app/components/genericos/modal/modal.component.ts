import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Location} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public textTitle = '';
  public textDescription = '';
  public textButton = '';
  public textLink = '';

  constructor(private dialogRef: MatDialogRef<ModalComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private locationVar: Location) {
      this.textTitle = data !== null ? data.textTitle : '';
      this.textDescription = data !== null ? data.textDescription : '';
      this.textButton = data !== null ? data.textButton : '';
      this.textLink = data !== null ? data.textLink : '';
    }

  ngOnInit(): void {
  }

  accionLink(): void {
    this.dialogRef.close();
    this.locationVar.back();
  }

}
