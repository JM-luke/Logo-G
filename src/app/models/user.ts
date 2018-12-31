
// export class User {
//     constructor(_id = '', __v = '', nombre = '', apellidos = '', email = '', role = 'ROLE_USER', pwd = '', confirmPwd = '', getToken = false){
//         _id: _id;
//         __v: __v
//         nombre: nombre;
//         apellidos: apellidos;
//         email: email;
//         role: role;
//         password: {
//           pwd: pwd;
//           confirmPwd: confirmPwd;
//         };
//         getToken: getToken;
//     }

//     _id: String;
//     __v: String
//     nombre: String;
//     apellidos: String;
//     email: String;
//     role: String;
//     password: String;
//     getToken: any;

// }
export class User {
    _id: number;
    __v: number;
    nombre: string;
    apellidos: string;
    email: string;
    role: string;
    password: {
        pwd: string;
        confirmPwd: string;
    };
    getToken: any;

    constructor(values: Object = {}){
        //constructor initialization
        Object.assign(this, values);
    }

}