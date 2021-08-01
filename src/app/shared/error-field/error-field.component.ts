import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.scss']
})
export class ErrorFieldComponent implements OnInit {

  @Input() mensajeCampo: string;
  constructor() { }

  ngOnInit(): void {
  }

}
