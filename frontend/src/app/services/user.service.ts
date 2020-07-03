import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from '@environments/environment';
import { map, catchError } from "rxjs/operators";
import { User } from '@app/models';
import { Observable, EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,private snackBar: MatSnackBar,) { }

    showMessage(msg: string, isError: boolean = false): void {
      this.snackBar.open(msg, "X", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError ? ["msg-error"] : ["msg-success"],
      });
    }

    getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}/user`);
    }

    readById(id: number): Observable<User> {
      const url = `${environment.apiUrl}/${id}`;
      return this.http.get<User>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

    errorHandler(e: any): Observable<any> {
      this.showMessage("Ocorreu um erro!", true);
      return EMPTY;
    }
}
