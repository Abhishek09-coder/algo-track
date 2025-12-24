
process.env.JWT_SECRET = "flsju049kds0wu4dlf9j320u3ojdlsj0u3w4udsjldou203u"
const request = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');


const TEST_USER_ID = '507f1f77bcf86cd799439011';

describe('Protected Route Tests', () => {

  it('should deny access without token', async () => {
    const res = await request(app).get('/api/v1/users/me');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/token missing/i);
  });

  it('should deny access with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer invalidtoken`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid token/i);
  });

  it('should deny access to admin route if role is not admin', async () => {
    const token = jwt.sign({ userId: TEST_USER_ID, role: 'user' }, process.env.JWT_SECRET);

    const res = await request(app)
      .get('/api/v1/admin/secret')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/admin/i);
  });

  it('should allow access to admin-only route with admin role', async () => {
    const token = jwt.sign({ userId: TEST_USER_ID, role: 'admin' }, process.env.JWT_SECRET);

    const res = await request(app)
      .get('/api/v1/admin/secret')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/welcome admin/i);
  });

});
