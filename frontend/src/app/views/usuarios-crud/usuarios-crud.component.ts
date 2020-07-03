import { HeaderService } from '@app/services/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-crud',
  templateUrl: './usuarios-crud.component.html',
  styleUrls: ['./usuarios-crud.component.css']
})
export class UsuariosCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Usuários',
      icon: 'people',
      routeUrl: '/semanas'
    }
  }

  ngOnInit(): void {
  }

  navigateToUsuariosCreate(): void {
    this.router.navigate(['/usuarios/create'])
  }

}
