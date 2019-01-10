import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User, Role, EmailGroups } from 'src/app/models';
import { passwordMatch } from '../../services/password-match'
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';



declare var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  
  public userForm: FormGroup;
  public roleList: String[];
  public emailGroups: String[];
  public loading = false;
  

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }
    
  ngOnInit() {
    this.roleList = Object.values(Role);
    this.emailGroups =  Object.values(EmailGroups);
    this.userForm = this.fb.group({
      _id: '',
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      emailGroups: [],
      role: [Role.User, Validators.required],
      createdDate: '',
      password: this.fb.group({
        pwd: ['',[Validators.required, Validators.minLength(6)]],
        confirmPwd: ['',[Validators.required, Validators.minLength(6)]]
      },{ validator: passwordMatch })
    });
    this.getUsers();
    this.idSubscribe();
  }
  
  public hasError = (controlName: string, errorName: string) =>{
    return this.userForm.get(controlName).hasError(errorName);
  };

  get id(){
    return this.userForm.get("_id");
  }
  get pwd(){
    return this.userForm.get("password.pwd");
  }
  get confirmPwd(){
    return this.userForm.get("password.confirmPwd");
  }
  
  private idSubscribe(){
    this.id.valueChanges.subscribe((value) => {
      if(value){
        this.pwd.clearValidators();
        this.confirmPwd.clearValidators();
        this.pwd.updateValueAndValidity();
        this.confirmPwd.updateValueAndValidity();
      }else{
        this.pwd.setValidators([Validators.required, Validators.minLength(6)]);
        this.confirmPwd.setValidators([Validators.required, Validators.minLength(6)]);
        this.pwd.updateValueAndValidity();
        this.confirmPwd.updateValueAndValidity();
      }
    });
  }
  
  addUser(userForm: FormGroup){
    if(!this.userForm.valid){
      M.toast({html: 'Form No valid!'});
      return;
    }
    this.loading = true;
    if(userForm.value._id){
      // update user
      this.userService.putUser(userForm.value)
        .pipe(first())
        .subscribe(data => {
          this.getUsers();
          M.toast({html: 'User updated!'});
          this.alertService.success('Registration successful', true);
          this.loading = false;
        }),
        error => {
          this.alertService.error(error);
          M.toast({html: error});
          this.loading = false;
        };
    }else{
      // create user
      delete userForm.value._id;
      this.userService.postUser(userForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.getUsers();
          M.toast({html: 'User created!'});
          this.alertService.success('Registration successful', true);
          this.loading = false;
          //this.router.navigate(['/login']);
        },
        error => {
          M.toast({html: error});
          this.alertService.error(error);
          this.loading = false;
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
    user.password = { pwd: null, confirmPwd: null };
    this.userForm.setValue(user);
    this.pwd.clearValidators();
    this.pwd.updateValueAndValidity();
    this.confirmPwd.clearValidators();
    this.confirmPwd.updateValueAndValidity();
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
        name: {value: ' ', disabled: false},
        surname: ' ',
        email: 'admin@admin.com',
        role: ' ',
        password: {
          pwd: null,
          confirmPwd: null
        }
      });
   
  }

}
