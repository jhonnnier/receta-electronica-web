import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserDetailService} from "../../services/auth/user-detail.service";
import {DataUser} from "../../dtos/DataUserModel";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  user: DataUser = <DataUser>{};
  badge = '';
  userName = '';

  @Input() mostrarUsuario = true;
  constructor(
    private router: Router,
    private userDetailService: UserDetailService
  ) { }

  ngOnInit(): void {
    this.user = this.userDetailService.usuario;
    this.badge = `${this.user.primerNombre.charAt(0)}${this.user.primerApellido.charAt(0)}`
    this.userName = `${this.user.primerNombre} ${this.user.primerApellido}`;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
