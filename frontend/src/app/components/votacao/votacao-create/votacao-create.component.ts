import { SemanaService } from '@app/services/semana.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotacaoService } from '@app/services/votacao.service';
import { SemanaAtual } from '@app/services/semanaAtual.service';
import { DiaSemanaService } from '@app/services/diaSemana.service';
import { RestaurantService } from '@app/services/restaurant.service';
import { Restaurant } from '@app/models/restaurant.model';
import { DiaSemana } from '@app/models/diaSemana.model';
import { Votacao } from '@app/models/votacao.model';
import { Semanas } from '@app/models/semana.model';


@Component({
  selector: 'app-votacao-create',
  templateUrl: './votacao-create.component.html',
  styleUrls: ['./votacao-create.component.css']
})

export class VotacaoCreateComponent implements OnInit {
  constructor(
    private votacaoService: VotacaoService,
    private router: Router,
    private diaSemanaService: DiaSemanaService,
    private restaurantService: RestaurantService,
    private semanaAtualService: SemanaAtual,
    private semanaService:SemanaService) { }

  semanas: Semanas[];
  diaSemanas: DiaSemana[];
  restaurants: Restaurant[];
  /*
    Inicialização da validação (Deve ser passado para um serviço e trazido apenas os resultados)
    - Validaçãoda Semana Corrente para não precisar ser selecionada
    - Validação para remoção dos dias da semanas que já forma cadastradas na semana por usuario
    - Vlaidação para remoção dos restaurantes já cadastrados na semana por usuario
  */
  estruturaResultado(): any{
    const test = this.votacaoService.read().subscribe(votacao => {
      const dia = votacao.reduce((obj, {diaSemana, restaurant}) => {
        if (!obj[diaSemana])
        obj[diaSemana] = [];
        obj[diaSemana].push(restaurant);
        return obj;
      }, {});

      const restaura = votacao.reduce((obj, {restaurant, diaSemana}) => {
        if (!obj[restaurant])
        obj[restaurant] = [];
        obj[restaurant].push(diaSemana);
        return obj;
      }, {});

      const semanaVotada = votacao.map((votacao) => {
        let semana = votacao.semana;
        for (const key in semana) {
          if (semana.hasOwnProperty(key)) {
            let element = semana.name;
            const validaSemana = this.semanaAtualService.semanaCorrente([semana])
            return validaSemana;
          }
        }
      }).reduce((x, y) => x.includes(y) ? x : [...x, y], [])[0];

      const restauranteVotado = Object.keys(restaura).map(restaurantVotado => {return { restaurantVotado };});
      const diaSemana = Object.keys(dia).map(diaSemana => {return { diaSemana }});
      const resultado= {
        nameRestaurante: restauranteVotado,
        votos: null,
        semana: semanaVotada[0],
        diaSemana: diaSemana
      }
     return resultado;
    })
  }

  /*
  Para seleção do cadastro de votados
  */
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
    user: JSON.parse(localStorage.getItem('currentUser'))
  }

  ngOnInit(): void {console.log(this.estruturaResultado()) }

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
