import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs';
import { User, Role } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy, OnInit{
  title = 'LOGO! WEB SERVER ';

  private currentUserSubscription: Subscription;
  public currentUser: User;
  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private authenticationService: AuthenticationService
    ){ 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });  
  }

  ngOnInit(){
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  logout(){
    this.authenticationService.logout();
    this._router.navigate(['/login']);
  }
}
