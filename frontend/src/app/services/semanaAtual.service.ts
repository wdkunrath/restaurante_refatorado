import { SemanaCorrente } from '@app/models/semana.model';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { SemanaService } from '@app/services/semana.service';
import { Semanas } from '@app/models/semana.model';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
/*
  Validação inicializada para pegar a semana corrente.
*/
export class SemanaAtual{
  constructor(
    private router: Router,
    private semanaService: SemanaService) { }

  semanas: Semanas[];

  selectedSemana = ():any =>{this.semanaService.read().subscribe(semanas => {
    this.semanas = this.semanaCorrente(semanas)
  });}

  semanaCorrente(semanas):any{
    let sem = semanas.map(semana => {
      const pegaData = (semana)=>{
        for (const key in semana) {
          if (semana.hasOwnProperty(key)) {
            const element = semana;
            return element
          }
        }
      }
      const dt = pegaData(semana)
      let datePipe = new DatePipe("pt-BR");
      let dataAtual = datePipe.transform(Date.now(), 'dd/MM/yyyy');
      let dataInit = datePipe.transform(dt.dataInit, 'dd/MM/yyyy');
      let dataEnd = datePipe.transform(dt.dataEnd, 'dd/MM/yyyy');
      let semanaCorrente = [{
        id: semana.id ,
        name: semana.name,
        dataInit: semana.dataInit,
        dataEnd: semana.dataEnd
      }];
      let semanaC = ((dataAtual >= dataInit && dataAtual >= dataEnd) ? semanaCorrente : []);
      if(semanaC){
        return semanaC.reduce((obj, {name, id}) => {
          if (!obj[id])
          obj[id] = [];
          obj[id].push(name);
          return obj;
        }, {});
      }else{console.log('deu ruim')}
    });

    if(sem){
      const semanaCorrente = sem[0][1];
      return semanaCorrente;
    }
  }
}
