import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
// import { from } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  
  addUser(form: NgForm){
    if(form.value._id){
      this.userService.putUser(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Usuario actualizado!'});
          this.getUsers();
        })
    }else{
      this.userService.postUser(form.value)
        .subscribe( (data)=> {
          console.log(data);
          if(!data.hasOwnProperty('user')){
            M.toast({html: 'Usuario No guardado!'});
          }else{
            this.resetForm(form);
            M.toast({html: 'Usuario guardado!'});
            this.getUsers();
          }
        });
    }
  }

  deleteUser(_id: String){
    if(confirm('¿Borrar usuario?')){
      this.userService.deleteUser(_id)
        .subscribe(res => {
          M.toast({html: 'Usuario eliminado!'});
          this.userService.selectedUser = new User();
          this.getUsers();
        });
    }
  }

  editUser(user: User){
    this.userService.selectedUser = user;
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(res => {
        this.userService.users = res as User[];
      })
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

}
