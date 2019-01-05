import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { passwordMatch } from '../../services/password-match';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';



declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]

})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    //
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      createdDate: '',
      password: this.fb.group({
        pwd: ['',[Validators.required, Validators.minLength(6)]],
        confirmPwd: ['',[Validators.required, Validators.minLength(6)]]
      },{ validator: passwordMatch })
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.get(controlName).hasError(errorName);
  }

  registerUser(registerForm: FormGroup){
    if(!this.registerForm.valid){
      M.toast({html: 'Form No valid!'});
      return;
    }
    this.userService.selectedUser = registerForm.value;
    if(registerForm.value._id){

      console.log('MyData');
      // this.userService.putUser(registerFormValue)
      //   .subscribe(res => {
      //     this.resetForm(form);
      //     M.toast({html: 'Usuario actualizado!'});
      //     //this.getUsers();
      //   })
    }else{
      console.log('register');
      this.userService.register(registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            M.toast({html: 'Registered Successfully :-)'});
            //this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            M.toast({html: error});
            //this.alertService.error(error);
            //this.loading = false;
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
