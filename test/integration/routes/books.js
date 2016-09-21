import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Books Integration', () => {
  const Book = app.datasource.models.Book;
  const User = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Deafult Description',
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
          Book
                  .destroy({ where: {} })
                  .then(() => Book.create(defaultBook))
                  .then(() => {
                    token = jwt.encode({ id: user.id }, jwtSecret);
                    done();
                  });
        });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', done => {
      request
                .get('/books')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.body[0].id).to.be.eql(defaultBook.id);
                  expect(res.body[0].name).to.be.eql(defaultBook.name);
                  expect(res.body[0].description).to.be.eql(defaultBook.description);
                  done(err);
                });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', done => {
      request
                .get('/books/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(defaultBook.id);
                  expect(res.body.name).to.be.eql(defaultBook.name);
                  expect(res.body.description).to.be.eql(defaultBook.description);
                  done(err);
                });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', done => {
      const newBook = {
        id: 2,
        name: 'New Book',
        description: 'New Description',
      };

      request
                .post('/books')
                .set('Authorization', `JWT ${token}`)
                .send(newBook)
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(newBook.id);
                  expect(res.body.name).to.be.eql(newBook.name);
                  expect(res.body.description).to.be.eql(newBook.description);
                  done(err);
                });
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', done => {
      const updatedBook = {
        id: 1,
        name: 'updated Book',
      };

      request
                .put('/books/1')
                .set('Authorization', `JWT ${token}`)
                .send(updatedBook)
                .end((err, res) => {
                  expect(res.body).to.be.eql([1]);

                  done(err);
                });
    });
  });

  describe('Route DELETE /books/:id', () => {
    it('should delete a book ', done => {
      request
                .delete('/books/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  expect(res.status).to.be.eql(HttpStatus.NO_CONTENT);
                  done(err);
                });
    });
  });
});
