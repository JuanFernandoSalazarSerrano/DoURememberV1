import { User } from "../models/User";

export const testUsers: User[] = [
  {
    id: 1,
    profilePicture: 'https://picsum.photos/id/57/367/267',
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
    profilePicture: 'https://picsum.photos/id/64/367/267',
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
    profilePicture: 'https://picsum.photos/id/950/4951/3301',
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
    profilePicture: 'https://picsum.photos/id/100/367/267',
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
