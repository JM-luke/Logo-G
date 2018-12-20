import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { GLOBAL } from './global';

// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  readonly URL_API = GLOBAL.url+'users';
  readonly URL_API_REG = GLOBAL.url+'register';
  readonly URL_API_LOGIN = GLOBAL.url+'login';

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  getUsers(){
    return this.http.get(this.URL_API);
  }

  postUser(user: User){
    return this.http.post(this.URL_API, user);
  }

  putUser(user: User){
    return this.http.put(`${this.URL_API}/${user._id}`, user);
  }

  deleteUser(_id: String){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  register(user: User){
    return this.http.post(this.URL_API_REG, user);
  }

  login(user: User){
    user.getToken  = true;
    return this.http.post(this.URL_API_LOGIN, user);
  }

  getIdentity(){}

  getToken(){}

  updateUser(){}

}
