import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';

declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]

})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  registerUser(registerForm){
    if(!this.registerForm.valid){
      M.toast({html: 'Form No valid!'});
      return;
    }
    let userToRegister: User;
    userToRegister = registerForm.value;
    this.userService.selectedUser = userToRegister;
    if(registerForm.value._id){
      console.log('update');
      // this.userService.putUser(registerFormValue)
      //   .subscribe(res => {
      //     this.resetForm(form);
      //     M.toast({html: 'Usuario actualizado!'});
      //     //this.getUsers();
      //   })
    }else{

      console.log('register');

      this.userService.register(registerForm.value)
        .subscribe( (data)=> {
          console.log(data);
          if(!data.hasOwnProperty('user')){
            M.toast({html: 'Usuario No registrado!'});
          }else{
            this.resetForm(registerForm);
            M.toast({html: 'Usuario registrado!'});
          }
      });
    }
   }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

}
