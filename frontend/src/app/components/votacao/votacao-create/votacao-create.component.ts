import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotacaoService } from './../../../service/votacao.service';
import { SemanaService } from './../../../service/semana.service';
import { DiaSemanaService } from './../../../service/diaSemana.service';
import { RestaurantService } from './../../../service/restaurant.service';
import { Restaurant } from './../../../models/restaurant.model';
import { DiaSemana } from './../../../models/diaSemana.model';
import { Votacao } from './../../../models/votacao.model';
import { Semanas } from '../../../models/semana.model';

@Component({
  selector: 'app-votacao-create',
  templateUrl: './votacao-create.component.html',
  styleUrls: ['./votacao-create.component.css']
})
export class VotacaoCreateComponent implements OnInit {
  constructor(
    private votacaoService: VotacaoService,
    private router: Router,
    private semanaService: SemanaService,
    private diaSemanaService: DiaSemanaService,
    private restaurantService: RestaurantService) { }
    
  semanas: Semanas[];
  diaSemanas: DiaSemana[];
  restaurants: Restaurant[];

  selectedSemana = ():any =>{this.semanaService.read().subscribe(semanas => {
    this.semanas = semanas;
  });}

  selectedDiaSemana = ():any =>{this.diaSemanaService.read().subscribe(diaSemanas => {
    this.diaSemanas = diaSemanas;
  });}

  selectedRestaurant = ():any =>{this.restaurantService.read().subscribe(restaurants => {
    this.restaurants = restaurants;
  });}

  votacao: Votacao = {
    semana: this.selectedSemana(),
    diaSemana: this.selectedDiaSemana(),
    restaurant: this.selectedRestaurant(),
    countVotacao: 0
  }


  ngOnInit(): void { }

  createVotacao(): void {
    this.votacaoService.create(this.votacao).subscribe(() => {
      this.votacaoService.showMessage('Restaurante de Votação Cadastrado com Sucesso!');
      this.router.navigate(['/votacao'])
    })

  }

  cancel(): void {
    this.router.navigate(['/votacao'])
  }
}
