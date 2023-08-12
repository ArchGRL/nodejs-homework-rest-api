const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logIn = require("./logIn");
const { User } = require('../../models/user/user');

jest.mock('../../models/user/user');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('test logIn function', () => {
  test('should log in successfully and return a token', async () => {
    const email = 'alla@gmail.com';
    const password = '123456';
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDE2N2I2NmI4MmFkYWQzMjkzYjg1NSIsImlhdCI6MTY5MTQ0NTI1OCwiZXhwIjoxNjkzMjU5NjU4fQ.1xXGQurv6mpweGMEurSz8sXybtU4gaJKcxMaoi7vmgA";
    const user = {
      _id: '64d167b66b82adad3293b855',
      id: '64d167b66b82adad3293b855',
      password: '$2b$10$qL7S7BKm2PNSAqI.9Kylf.Q/.3qdLpOoSBJn/asoAum9WLEBAupOe',
    };

    User.findOne.mockResolvedValue(user);

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue(token);

    User.findByIdAndUpdate.mockResolvedValue(user);

    const req = {
      body: { email, password },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await logIn(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token,
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});

