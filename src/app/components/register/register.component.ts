import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { passwordMatch } from '../../services/password-match';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';



declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]

})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public loading = false;
  public currentUser: User;
  private currentUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { 
  }

  ngOnInit() {
    //
    this.registerForm = this.fb.group({
      _id:'',
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      createdDate: '',
      password: this.fb.group({
        pwd: ['',[Validators.required, Validators.minLength(6)]],
        confirmPwd: ['',[Validators.required, Validators.minLength(6)]]
      },{ validator: passwordMatch })
    });
    this.getUser();
  }
  
  private getUser(){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    if(this.currentUser){
      
      this.registerForm.get("name").setValue(this.currentUser.name);
      this.registerForm.get("surname").setValue(this.currentUser.surname);
      this.registerForm.get("email").setValue(this.currentUser.email);
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.get(controlName).hasError(errorName);
  }
  
  registerUser(registerForm: FormGroup){
    if(!this.registerForm.valid){
      M.toast({html: 'Form No valid!'});
      return;
    }
    this.registerForm.get("_id").setValue(this.currentUser._id);
    this.loading = true
    //this.userService.selectedUser = registerForm.value;
    if(this.currentUser){
      this.userService.putUser(registerForm.value)
        .subscribe(
        data => {
          M.toast({html: 'User updated!'});
          this.alertService.success('Update successful', true);
          this.loading = false;
        },
        error => {
          M.toast({html: error});
          this.alertService.error(error);
          this.loading = false;
        });
    }else{
      this.userService.register(registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            M.toast({html: 'Registered Successfully :-)'});
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
            this.loading = false;
          },
          error => {
            M.toast({html: error});
            this.alertService.error(error);
            this.loading = false;
          });
    }
   }
  
  resetForm(form?: FormGroup){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

}
