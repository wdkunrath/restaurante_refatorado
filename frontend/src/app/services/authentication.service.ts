import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';
import { environment } from '@environments/environment';
import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    user: User
    isLoggedin: boolean = false;
    constructor(private http: HttpClient, private userService: UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    isLoggedIn() {
      //debugger;
      if (localStorage.getItem("currentUser") == null) {
        this.isLoggedin = false;
        return this.isLoggedin;
      }
      else {
        return true;
      }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    validUser(id:number){
      this.userService.readById(id).subscribe((user) =>{
        if(user !== null){
          let logado = this.isLoggedIn();
          if(logado){
            let userlogado = JSON.parse(localStorage.getItem('currentUser'))
            let userlogadoID = userlogado.map((user)=>{
              return user.id;
            });
            
            if(user.id === userlogadoID){
              return true;
            }
          }
        }else{
          return false;
        }
      })
    }
}
