import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { DiaSemana } from "@app/models/diaSemana.model";

@Injectable({
    providedIn: "root",
})

export class DiaSemanaService {
    baseUrl = "http://localhost:3001/dia-semana";


    constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    showMessage(msg: string, isError: boolean = false): void {
      this.snackBar.open(msg, "X", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ["msg-error"] : ["msg-success"],
      });
    }

    read(): Observable<DiaSemana[]> {
        return this.http.get<DiaSemana[]>(this.baseUrl).pipe(
          map((obj) => obj),
          catchError((e) => this.errorHandler(e))
        );
    }

    readById(id: number): Observable<DiaSemana> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<DiaSemana>(url).pipe(
          map((obj) => obj),
          catchError((e) => this.errorHandler(e))
        );
    }

    errorHandler(e: any): Observable<any> {
        this.showMessage("Ocorreu um erro!", true);
        return EMPTY;
    }
}
