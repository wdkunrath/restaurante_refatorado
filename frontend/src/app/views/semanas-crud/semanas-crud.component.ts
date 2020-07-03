import { HeaderService } from '@app/services/header.service';
import { Component, OnInit, Pipe  } from '@angular/core';
import { Router } from '@angular/router'
;

@Component({
  selector: 'app-semanas-crud',
  templateUrl: './semanas-crud.component.html',
  styleUrls: ['./semanas-crud.component.css']
})
export class SemanasCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro da Semana',
      icon: 'date_range',
      routeUrl: '/semanas'
    }
  }

  ngOnInit(): void { }

  navigateToSemanasCreate(): void {
    this.router.navigate(['/semanas/create'])
  }

}
