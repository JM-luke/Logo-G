import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
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
  
  public userForm: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.userForm = new FormGroup({
      nombre: new FormControl(this.userService.selectedUser.nombre, [Validators.required, Validators.maxLength(30)]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.controls[controlName].hasError(errorName);
  }
  
  addUser(userForm){
    if(!this.userForm.valid){
      console.log('Form NO valid');
      M.toast({html: 'Form No valid!'});
      return;
    }
    if(userForm.value._id){
      this.userService.putUser(userForm.value)
        .subscribe(res => {
          this.resetForm(userForm);
          M.toast({html: 'Usuario actualizado!'});
          this.getUsers();
        })
    }else{
      this.userService.postUser(userForm.value)
        .subscribe( (data)=> {
          console.log(data);
          if(!data.hasOwnProperty('user')){
            M.toast({html: 'Usuario No guardado!'});
          }else{
            this.resetForm(userForm);
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
      //this.userService.selectedUser = new User();
    }
  }

}
