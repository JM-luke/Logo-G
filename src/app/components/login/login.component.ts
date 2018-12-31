import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
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

  public identity: string;
  public token: string;
  public loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private _router: Router,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]]
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.get(controlName).hasError(errorName);
  }
  
  loginUser(form: FormGroup){
    this.userService.login(form.value)
      .subscribe((data: any)=> {
        if(data.hasOwnProperty('user_logged')){
          if(data.user_logged.token  && data.user_logged.user){
            this.identity = data.user_logged.user;
            localStorage.setItem('token', data.user_logged.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));
            M.toast({html: 'logged :-)'});
            this._router.navigate(['/']);
            this.resetForm();
            return;
          }
        }
        M.toast({html: 'You are not logged in :-(<br/> email or password incorrect!.'});
      });
  }

  resetForm(form?: FormGroup){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }
}
