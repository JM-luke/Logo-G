import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../global';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private URL_API = GLOBAL.url;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user: User) {
        this.http.post(this.URL_API+'login', user);
        return this.http.post<any>(`${this.URL_API}login`, user)
            .pipe(map(data => {

              if(data.hasOwnProperty('user_logged')){
                // login successful if there's a jwt token and user in the response
                if(data.user_logged.token  && data.user_logged.user){
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('token', data.user_logged.token);
                  localStorage.setItem('currentUser', JSON.stringify(data.user_logged.user));
                  this.currentUserSubject.next(data.user_logged.user);
                }
              }
              return user;

            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}