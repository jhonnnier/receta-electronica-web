import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public actualYear = '';
  constructor() { }

  ngOnInit(): void {
    this.actualYear = new Date().getFullYear().toString();
  }

}
