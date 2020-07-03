import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Votacao } from "@app/models/votacao.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class VotacaoService {
  baseUrl = "http://localhost:3001/votacao-restaurante";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(votacao: Votacao): Observable<Votacao> {
    return this.http.post<Votacao>(this.baseUrl, votacao).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Votacao[]> {
    return this.http.get<Votacao[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Votacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Votacao>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(votacao: Votacao): Observable<Votacao> {
    const url = `${this.baseUrl}/${votacao.id}`;
    return this.http.put<Votacao>(url, votacao).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  // Opção Moderador - Melhoria
  delete(id: number): Observable<Votacao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Votacao>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

}
