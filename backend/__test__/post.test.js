const request = require('supertest');
const app = require('../index'); // Update with the correct path to your Express app
const { Post } = require('../db');

describe('Post Routes', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/api/v1/post/create')
      .send({ content: 'Test post' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post created successfully');
    expect(response.body.post).toHaveProperty('_id');
  });

  it('should retrieve all posts', async () => {
    // Assuming you have a post in the database for testing
    const existingPost = await Post.create({ content: 'Existing post for testing' });

    const response = await request(app).get('/api/v1/post/all');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully retrieved all posts');
    expect(response.body.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: existingPost._id.toString(), content: 'Existing post for testing' }),
      ])
    );
  });

  // Add more test cases as needed
});
