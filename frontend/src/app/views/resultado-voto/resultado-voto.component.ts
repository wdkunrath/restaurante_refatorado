import { HeaderService } from '@app/services/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-resultado-voto',
  templateUrl: './resultado-voto.component.html',
  styleUrls: ['./resultado-voto.component.css']
})
export class ResultadoVotoCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Resultado Votação',
      icon: 'emoji_events',
      routeUrl: '/resultado-voto'
    }
  }

  ngOnInit(): void {
  }

  navigateToVotar(): void {
    this.router.navigate(['/votacao'])
  }

}
