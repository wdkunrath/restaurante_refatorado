import { HeaderService } from '@app/services/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votacao-crud',
  templateUrl: './votacao-crud.component.html',
  styleUrls: ['./votacao-crud.component.css']
})
export class VotacaoCrudComponent implements OnInit {

  constructor(
    private router: Router,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Votação',
      icon: 'analytics',
      routeUrl: '/votacao'
    }
  }

  ngOnInit(): void {

  }

  navigateToVotacaoCreate(): void {
    this.router.navigate(['/votacao/create'])
  }

}
