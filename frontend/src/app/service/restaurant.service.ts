import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Restaurant } from "../models/restaurant.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RestaurantService {
  baseUrl = "http://localhost:3001/restaurant";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.baseUrl, restaurant).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Restaurant> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Restaurant>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(restaurant: Restaurant): Observable<Restaurant> {
    const url = `${this.baseUrl}/${restaurant.id}`;
    return this.http.put<Restaurant>(url, restaurant).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Restaurant> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Restaurant>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
