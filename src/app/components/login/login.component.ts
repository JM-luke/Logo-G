import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) {

   
  }

  ngOnInit() {

  }
  
  loginUser(form: NgForm){
    this.userService.login(form.value)
      .subscribe( (data)=> {
        console.log(data);
        if(!data.hasOwnProperty('user')){
          M.toast({html: 'You are not logged in!'});
        }else{
          M.toast({html: 'logged'});
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
