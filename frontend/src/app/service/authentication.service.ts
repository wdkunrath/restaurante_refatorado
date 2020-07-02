import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuarios } from './../models/usuarios.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = "http://localhost:3001/user";
    private currentUserSubject: BehaviorSubject<Usuarios>;
    public currentUser: Observable<Usuarios>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Usuarios>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuarios {
        return this.currentUserSubject.value;
    }

    login(username: string) {
        return this.http.post<any>(`${this.baseUrl}/authenticate`, { username })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}