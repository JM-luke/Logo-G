import { getToken } from '@angular/router/src/utils/preactivation';

export class User {
    constructor(_id = '', nombre = '', apellidos = '', email = '', role = 'ROLE_USER', password = '', getToken = false){
        _id: _id;
        nombre: nombre;
        apellidos: apellidos;
        email: email;
        role: role;
        password: password;
        getToken: getToken;
    }

    _id: String;
    nombre: String;
    apellidos: String;
    email: String;
    role: String;
    password: String;
    getToken: any;

}
