import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private language: Array<string>;

  constructor(public translate: TranslateService) {
    this.language = ['es_ARG', 'en_COL'];
    translate.addLangs(this.language);
    translate.setDefaultLang('es_ARG');
  }

  ngOnInit(): void {
  }
}
