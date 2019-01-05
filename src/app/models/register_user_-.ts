export class RegisterUser {
    _id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    password: {
        pwd: string;
        confirmPwd: string;
    };

    constructor(values: Object = {}){
        //constructor initialization
        Object.assign(this, values);
    }

}