import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Semanas } from "@app/models/semana.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Votacao } from '@app/models/votacao.model';
import { VotacaoService } from '@app/services/votacao.service';

@Injectable({
  providedIn: "root",
})

export class SemanaService {
  baseUrl = "http://localhost:3001/semana";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private votacaoService: VotacaoService) {}

  votacao: Votacao;


  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(semanas: Semanas): Observable<Semanas> {
    return this.http.post<Semanas>(this.baseUrl, semanas).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Semanas[]> {
    return this.http.get<Semanas[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Semanas> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Semanas>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(semanas: Semanas): Observable<Semanas> {
    const url = `${this.baseUrl}/${semanas.id}`;
    return this.http.put<Semanas>(url, semanas).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Semanas> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Semanas>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // validUsuario(){
  //     this.votacaoService.read().subscribe(votacao => {
  //       votacao.map((votos)=>{
  //       if(votos.user == localStorage.getItem('currentUser')){
  //         console.log('top')
  //       }else{
  //         return  false
  //       }
  //     })
  //   })
  // }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
