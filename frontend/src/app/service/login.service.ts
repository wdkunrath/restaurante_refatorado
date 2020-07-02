import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuarios } from './../models/usuarios.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: "root",
})

export class LoginService {
    showMessage(arg0: string) {
      throw new Error("Method not implemented.");
    }
    baseUrl = "http://localhost:3001/user";

    usuarios: Usuarios

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    isLoggedIn():boolean {
        return this.usuarios !== undefined;
    }

    login(name: string):Observable<Usuarios>{
        return this.http.post<Usuarios>(this.baseUrl, {name: name});
    }
}