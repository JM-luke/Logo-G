import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

declare var M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  registerUser(form: NgForm){
    console.log('register');
    this.userService.register(form.value)
      .subscribe( (data)=> {
        console.log(data);
        if(!data.hasOwnProperty('user')){
          M.toast({html: 'Usuario No registrado!'});
        }else{
          this.resetForm(form);
          M.toast({html: 'Usuario registrado!'});
        }
    });
  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

}
