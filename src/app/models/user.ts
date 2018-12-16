export class User {
    constructor(_id = '', nombre = '', apellidos = '', email = '', role = 'ROLE_USER', password = ''){
        _id: _id;
        nombre: nombre;
        apellidos: apellidos;
        email: email;
        role: role;
        password: password;
    }

    _id: String;
    nombre: String;
    apellidos: String;
    email: String;
    role: String;
    password: String;

}
