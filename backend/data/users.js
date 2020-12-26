import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admim@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Dizy DJ',
    email: 'dizy_music@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jay Bhagat',
    email: 'jay_b@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
