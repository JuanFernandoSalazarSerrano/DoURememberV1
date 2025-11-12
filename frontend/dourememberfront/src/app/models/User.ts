export class User {
  id: number | null = null;
  profilepicture: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  role: string = '';
  medical_condition: string = '';
  carer: string = '';
  doctor = {
    id: 0  // nested object (this is what your backend expects)
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
