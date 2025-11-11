export class User {
  id: number | null = null;
  profilepicture: string = 'https://noimageurl.com';
  name: string = 'noname';
  lastname: string = 'nolastname';
  email: string = 'noemail@gmail.com';
  username: string = 'nousername';
  password: string = 'nopassword';
  role: string = 'norole';
  medical_condition: string = 'nocondition';
  carer: string = 'nocarer';
  doctor = {
    id: 2  // nested object (this is what your backend expects)
  };
}

// export class User {
//   id: number = 0;
//   name: string = '';
//   lastname: string = '';
//   email: string = '';
//   username: string = '';
//   password: string = '';
//   role: string = '';
// }
