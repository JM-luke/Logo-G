import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { GLOBAL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  readonly URL_API = GLOBAL.url;
  private identity = null;
  private token = null;

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  getUsers(){
    return this.http.get(this.URL_API+'users');
  }

  postUser(user: User){
    return this.http.post(this.URL_API+'users', user);
  }

  putUser(user: User){
    return this.http.put(`${this.URL_API}users/${user._id}`, user);
  }

  deleteUser(_id: String){
    return this.http.delete(`${this.URL_API}users/${_id}`);
  }

  register(user: User){
    return this.http.post(this.URL_API+'register', user);
  }
  
  getToken(){
    const token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token; 
  }  
}
