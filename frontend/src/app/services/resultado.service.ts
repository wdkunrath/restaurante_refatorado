import { Resultado } from '@app/models/resultado.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { VotacaoService } from '@app/services/votacao.service';
import { Restaurant } from '@app/models/restaurant.model';
import { Semanas } from "@app/models/semana.model";
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ResultadoService {
    constructor(
      private http: HttpClient,
      private snackBar: MatSnackBar,
      private votacaoService: VotacaoService,
    ) {}

    baseUrl = "http://localhost:3001/resultado";
    restaurants: Restaurant[];
    semanas: Semanas;
    resultado: [];

    showMessage(msg: string, isError: boolean = false): void {
      this.snackBar.open(msg, "X", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ["msg-error"] : ["msg-success"],
      });
    }

    create(resultado: Resultado): Observable<Resultado> {
      return this.http.post<Resultado>(this.baseUrl, resultado).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

    read(): Observable<Resultado[]> {
      return this.http.get<Resultado[]>(this.baseUrl).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

    readById(id: number): Observable<Resultado> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Resultado>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

    update(resultado: Resultado): Observable<Resultado> {
      const url = `${this.baseUrl}/${resultado.id}`;
      return this.http.put<Resultado>(url, resultado).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

    delete(id: number): Observable<Resultado> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<Resultado>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

    estruturaResultado(): []{
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
              return element;
            }
          }
        }).reduce((x, y) => x.includes(y) ? x : [...x, y], []);

        const restauranteVotado = Object.keys(restaura).map(restaurantVotado => {return { restaurantVotado };});
        const diaSemana = Object.keys(dia).map(diaSemana => {return { diaSemana }});

        const resultado= {
          nameRestaurante: restauranteVotado,
          votos: null,
          semana: semanaVotada,
          diaSemana: diaSemana
        }
        return resultado;
      })

      this.resultado = JSON.stringify(test);
      return this.resultado;
    }

    errorHandler(e: any): Observable<any> {
      this.showMessage("Ocorreu um erro!", true);
      return EMPTY;
    }
}
