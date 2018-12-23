import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { GLOBAL } from './global';
import { getToken } from '@angular/router/src/utils/preactivation';

// import { Observable } from 'rxjs';

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

  login(user: User){
    return this.http.post(this.URL_API+'login', user);
  }

  // signup(user_to_login, gettoken = null){
	// 	if(gettoken != null){
	// 		user_to_login.gettoken = gettoken;
	// 	}

	// 	let params = JSON.stringify(user_to_login);
	// 	let headers = new Headers({'Content-Type':'application/json'});

	// 	return this._http.post(this.url+'login', params, {headers: headers})
	// 					 .map(res => res.json());
	// }

	getIdentity(){
    const identity = JSON.parse(localStorage.getItem('identity'));

		if(identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
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



  updateUser(){}

}
