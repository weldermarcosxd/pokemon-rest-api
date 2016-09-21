import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Users Integration', () => {
  const User = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: 'User',
    email: 'user@defaltuser.com',
    password: 'pass123',
  };

  const defaultlogger = {
    name: 'alfa',
    email: 'alfa@greek.com',
    password: 'afla',
  };

  let token;

  beforeEach(done => {
    User
        .destroy({ where: {} })
        .then(() => User.create(defaultlogger))
        .then(user => {
          User
                  .create(defaultUser)
                  .then(() => {
                    token = jwt.encode({ id: user.id }, jwtSecret);
                    done();
                  });
        });
  });

  describe('Route GET /Users', () => {
    it('should return a list of Users', done => {
      request
                .get('/Users')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.body[0].id).to.be.eql(defaultUser.id);
                  expect(res.body[0].name).to.be.eql(defaultUser.name);
                  expect(res.body[0].email).to.be.eql(defaultUser.email);
                  done(err);
                });
    });
  });

  describe('Route GET /Users/:id', () => {
    it('should return a User', done => {
      request
                .get('/Users/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(defaultUser.id);
                  expect(res.body.name).to.be.eql(defaultUser.name);
                  expect(res.body.email).to.be.eql(defaultUser.email);
                  done(err);
                });
    });
  });

  describe('Route POST /Users', () => {
    it('should create a User', done => {
      const newUser = {
        id: 2,
        name: 'New User',
        email: 'user@newuser.com',
        password: 'newpass123',
      };

      request
                .post('/Users')
                .set('Authorization', `JWT ${token}`)
                .send(newUser)
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(newUser.id);
                  expect(res.body.name).to.be.eql(newUser.name);
                  expect(res.body.email).to.be.eql(newUser.email);
                  done(err);
                });
    });
  });

  describe('Route PUT /Users/:id', () => {
    it('should update a User', done => {
      const updatedUser = {
        id: 1,
        name: 'updated User',
        email: 'user@updateduser.com',
      };

      request
                .put('/Users/1')
                .set('Authorization', `JWT ${token}`)
                .send(updatedUser)
                .end((err, res) => {
                  expect(res.body).to.be.eql([1]);

                  done(err);
                });
    });
  });

  describe('Route DELETE /Users/:id', () => {
    it('should delete a User ', done => {
      request
                .delete('/Users/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.status).to.be.eql(HttpStatus.NO_CONTENT);
                  done(err);
                });
    });
  });
});
