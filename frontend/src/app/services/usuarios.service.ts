import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Usuarios } from '@app/models/usuarios.model';

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  baseUrl = "http://localhost:3001/user";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(usuarios: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.baseUrl, usuarios).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Usuarios> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuarios>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(usuarios: Usuarios): Observable<Usuarios> {
    const url = `${this.baseUrl}/${usuarios.id}`;
    return this.http.put<Usuarios>(url, usuarios).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Usuarios> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Usuarios>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
