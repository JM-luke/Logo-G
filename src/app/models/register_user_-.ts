export class RegisterUser {
    _id: number;
    nombre: string;
    apellidos: string;
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