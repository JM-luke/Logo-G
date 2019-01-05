
// export class User {
//     constructor(_id = '', __v = '', name = '', surname = '', email = '', role = 'ROLE_USER', pwd = '', confirmPwd = '', getToken = false){
//         _id: _id;
//         __v: __v
//         name: name;
//         surname: surname;
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
//     name: String;
//     surname: String;
//     email: String;
//     role: String;
//     password: String;
//     getToken: any;

// }
export class User {
    _id: number;
    __v: number;
    name: string;
    surname: string;
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