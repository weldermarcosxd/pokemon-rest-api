import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes Books Contract', () => {
  const Book = app.datasource.models.Book;
  const User = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
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
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));

      request
                .get('/books')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  joiAssert(res.body, booksList);

                  done(err);
                });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', done => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
      });

      request
                .get('/books/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                  joiAssert(res.body, book);
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

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
      });

      request
                .post('/books')
                .set('Authorization', `JWT ${token}`)
                .send(newBook)
                .end((err, res) => {
                  joiAssert(res.body, book);

                  done(err);
                });
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', done => {
      const updatedBook = {
        id: 1,
        name: 'updated Book',
        description: 'updated Book description',
      };

      const updatedCount = Joi.array().items(1);

      request
                .put('/books/1')
                .set('Authorization', `JWT ${token}`)
                .send(updatedBook)
                .end((err, res) => {
                  joiAssert(res.body, updatedCount);

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
