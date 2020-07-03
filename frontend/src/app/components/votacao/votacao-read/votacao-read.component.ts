import { Component, OnInit} from '@angular/core';
import { User } from '@app/models/user';
import { AuthenticationService } from '@app/services/authentication.service';
import { Votacao } from '@app/models/votacao.model';
import { VotacaoService } from '@app/services/votacao.service';
import { SemanaService } from '@app/services/semana.service';
@Component({
  selector: 'app-votacao-read',
  templateUrl: './votacao-read.component.html',
  styleUrls: ['./votacao-read.component.css']
})

export class VotacaoReadComponent implements OnInit {

  constructor(private votacaoService: VotacaoService,
    private authenticationService: AuthenticationService,
    private semanaService: SemanaService
    ) { }

  votacao: Votacao[];
  user : User;
  displayedColumns = ['id', 'diaSemana','restaurant', 'action']

  /*
    Validação do usuario logado com o que foi votado pata trazer apenas votos do usuario logado
  */

  ngOnInit(): void {
    this.votacaoService.read().subscribe(votacao => {
      this.votacao = votacao
    })
  }
}
