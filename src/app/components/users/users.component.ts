import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { passwordMatch } from '../../services/password-match'


declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  
  public userForm: FormGroup;
  private roleList: string[];
  

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }
    
  ngOnInit() {
    this.roleList = ['ROLE_USER','ROLE_SUPER','ROLE_ADMIN'];
    this.userForm = this.fb.group({
      _id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      role: ['ROLE_USER', Validators.required],
      password: this.fb.group({
        pwd: ['', [ Validators.minLength(6)]],
        confirmPwd: ['', [Validators.minLength(6)]]
      },{ validator: passwordMatch })
    });
    this.getUsers();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.get(controlName).hasError(errorName);
  }
  
  addUser(userForm: FormGroup){
    if(!this.userForm.valid){
      M.toast({html: 'Form No valid!'});
      return;
    }
    if(userForm.value._id){
      this.userService.putUser(userForm.value)
        .subscribe(data => {
          this.getUsers();
          M.toast({html: 'User updated!'});
          //this.resetForm();
        });
        
    }else{
      delete userForm.value._id;
      this.userService.postUser(userForm.value)
        .subscribe( (data)=> {
          if(!data.hasOwnProperty('user')){
            M.toast({html: 'User not saved!'});
          }else{
            M.toast({html: 'User saved!'});
            this.getUsers();
            //this.resetForm();
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
    delete user.__v;
    user.password = {pwd: null, confirmPwd: null};
    this.userForm.setValue(user);
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(res => {
        this.userService.users = res as User[];
      })
  }

  resetForm(){
    //this.userService.selectedUser = new User();
  
    //this.userForm.reset();
      this.userForm.reset({
        _id: null,
        nombre: {value: ' ', disabled: false},
        apellidos: ' ',
        email: 'admin@admin.com',
        role: ' ',
        password: {
          pwd: null,
          confirmPwd: null
        }
      });
   
  }

}
