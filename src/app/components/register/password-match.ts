import { AbstractControl } from "@angular/forms";
export function passwordMatch (control: AbstractControl):{[key: string]: boolean}{

    const pwd = control.get('pwd');
    const confirmPwd = control.get('confirmPwd');
    //if FormControl objects don't exist, return null
    if(!pwd || !confirmPwd) return null;
    if(!pwd.touched && !confirmPwd.touched) return null;
    //if they are indeed equal, return null
    if(pwd.value === confirmPwd.value) return null;
    //else
    return { mismatch: true };
    
}