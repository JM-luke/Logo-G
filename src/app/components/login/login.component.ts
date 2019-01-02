import { Component, OnInit } from '@angular/core';
//import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute }  from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
//import { AlertService } from '../../services/authentication.service';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [UserService]
})
export class LoginComponent implements OnInit {

  //public identity: string;
  public token: string;
  public loginForm: FormGroup;
  public loading = false;
  private returnUrl: string;

  constructor(
    //private userService: UserService,
    private authenticationService: AuthenticationService,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    if (this.authenticationService.currentUserValue) { 
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]]
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.get(controlName).hasError(errorName);
  }
  
  loginUser(form: FormGroup){

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(form.value)
        .pipe(first())
        .subscribe(
          data => {
            this._router.navigate([this.returnUrl]);
            M.toast({html: 'logged :-)'});
            this.resetForm();
          },
          error => {
            //this.alertService.error(error);
            M.toast({html: 'You are not logged in :-(<br/> email or password incorrect!.'});
            this.loading = false;
          });


    // this.userService.login(form.value)
    //   .subscribe((data: any)=> {
    //     if(data.hasOwnProperty('user_logged')){
    //       if(data.user_logged.token  && data.user_logged.user){
    //         this.identity = data.user_logged.user;
    //         localStorage.setItem('token', data.user_logged.token);
    //         localStorage.setItem('identity', JSON.stringify(this.identity));
    //         M.toast({html: 'logged :-)'});
    //         this._router.navigate(['/']);
    //         this.resetForm();
    //         return;
    //       }
    //     }
    //     M.toast({html: 'You are not logged in :-(<br/> email or password incorrect!.'});
    //   });
  }

  resetForm(form?: FormGroup){
    if(form){
      form.reset();
      //this.userService.selectedUser = new User();
    }
  }
}
