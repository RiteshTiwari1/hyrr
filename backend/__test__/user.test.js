const request = require('supertest');
const app = require('../index'); // Update with the correct path to your Express app
const { User } = require('../db');

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/user/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        confirmPassword: 'testpassword',
      });
      console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should sign in an existing user', async () => {
    // Assuming you have an existing user in the database for testing
    // const existingUser = await User.create({
    //   email: 'ritesh12345@example.com',
    //   password: 'Hellooo',
    // });

    const response = await request(app)
      .post('/api/v1/user/signin')
      .send({
        email: 'ritesh12345@example.com',
        password: 'Hellooo',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Add more test cases as needed
});
