import { VotacaoService } from '../../../service/votacao.service';
import { Votacao } from '../../../models/votacao.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votacao-read',
  templateUrl: './votacao-read.component.html',
  styleUrls: ['./votacao-read.component.css']
})
export class VotacaoReadComponent implements OnInit {  
  votacao: Votacao[]
  displayedColumns = ['id', 'semana','diaSemana','restaurant','countVotacao','action']
  
  constructor(private votacaoService: VotacaoService) { }

  ngOnInit(): void {
    this.votacaoService.read().subscribe(votacao => { 
      this.votacao = votacao; 
    })
  }  
}
