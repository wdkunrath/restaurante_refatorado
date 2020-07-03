import { Component, OnInit, Pipe } from '@angular/core';
import { ResultadoService } from '@app/services/resultado.service';
import { Router } from '@angular/router';
import { Resultado } from '@app/models/resultado.models';

@Component({
  selector: 'app-resultado-read',
  templateUrl: './resultado-read.component.html',
  styleUrls: ['./resultado-read.component.css']
})
export class ResultadoReadComponent implements OnInit {

  constructor(
    private resultadoService: ResultadoService,
    private router: Router
    ) { }

  resultado: Resultado[];

  ngOnInit(): void {
  }

  buscaResultado(): void{
    return this.resultadoresultado = this.resultadoService.estruturaResultado();
  }

  get  estrutura(): string{
    return this.buscaResultado();
  }
}
