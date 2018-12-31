import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { passwordMatch } from '../../services/password-match'


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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    //
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
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
            M.toast({html: 'Usuario registrado!'});
          }
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
