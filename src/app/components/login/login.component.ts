import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute }  from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';


declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  public token: string;
  public loginForm: FormGroup;
  public loading = false;
  private returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: AlertService
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
            this.alertService.success('logged :-)');
            
            M.toast({html: 'logged :-)'});
            this.resetForm();
          },
          error => {           
            this.alertService.error(error);
            M.toast({html: `You are not logged in<br/> ${error}`});
            this.loading = false;
          });
  }

  resetForm(form?: FormGroup){
    if(form){
      form.reset();

    }
  }
}
