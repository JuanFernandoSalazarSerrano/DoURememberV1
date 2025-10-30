import { User } from "../models/User";

export const testUsers: User[] = [
  {
    id: 1,
    name: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'password123',
    role: 'patient',
    condition: 'diabetes',
    carer: 'Smith'
  },
  {
    id: 2,
    name: 'Jane',
    lastname: 'Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    password: 'password456',
    role: 'doctor',
    condition: 'hypertension',
    carer: 'Johnson'
  },
  {
    id: 3,
    name: 'Bob',
    lastname: 'Johnson',
    email: 'bob@example.com',
    username: 'bobjohnson',
    password: 'password789',
    role: 'patient',
    condition: 'asthma',
    carer: 'Brown'
  },
  {
    id: 4,
    name: 'Alice',
    lastname: 'Williams',
    email: 'alice@example.com',
    username: 'alicewilliams',
    password: 'password012',
    role: 'doctor',
    condition: 'cancer',
    carer: 'Lee'
  }
];
