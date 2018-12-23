import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router }  from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public identity;
	public token;
  constructor(
    private userService: UserService,
    private _router: Router,
  ) {

  }

  ngOnInit() {

  }
  
  loginUser(form: NgForm){
    this.userService.login(form.value)
      .subscribe((data: any)=> {

        if(data.user_logged.token  && data.user_logged.user){
          this.identity = data.user_logged.user;
          localStorage.setItem('token', data.user_logged.token);
          localStorage.setItem('identity', JSON.stringify(this.identity));
          M.toast({html: 'logged'});
          this._router.navigate(['/']);
        }else{
          M.toast({html: `${data.message}<br/>You are not logged in!`});
        }
        this.resetForm();
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }
}
