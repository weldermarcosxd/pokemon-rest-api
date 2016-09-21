import BooksController from '../../../controllers/books.js';

describe('Books Controllers Unity', () => {
  describe('Get all books : getAll()', () => {
    it('should return a list of books', () => {
      const Book = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Teste Book',
        created_at: '2016-09-09T00:54:37.785Z',
        updated_at: '2016-09-09T00:54:37.785Z',
      }];

      td.when(Book.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);

      return booksController.findAll()
                .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a book : findById()', () => {
    it('should return a book', () => {
      const Book = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Teste Book',
        created_at: '2016-09-09T00:54:37.785Z',
        updated_at: '2016-09-09T00:54:37.785Z',
      };

      td.when(Book.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);

      return booksController.findById({ id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a book : create()', () => {
    it('should create a book', () => {
      const Book = {
        create: td.function(),
      };

      const requestBody = {
        name: 'New Book',
      };

      const expectedResponse = {
        id: 1,
        name: 'Teste Book',
        created_at: '2016-09-09T00:54:37.785Z',
        updated_at: '2016-09-09T00:54:37.785Z',
      };

      td.when(Book.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);

      return booksController.create(requestBody)
                .then(response => {
                  expect(response.statusCode).to.be.eql(201);
                  expect(response.data).to.be.eql(expectedResponse);
                });
    });
  });

  describe('update a book : update()', () => {
    it('should update a book', () => {
      const Book = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Old Book updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Old Book updated',
        created_at: '2016-09-09T00:54:37.785Z',
        updated_at: '2016-09-09T00:54:37.785Z',
      };

      td.when(Book.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);

      return booksController.update(requestBody, { id: 1 })
                .then(response => {
                  expect(response.statusCode).to.be.eql(200);
                  expect(response.data).to.be.eql(expectedResponse);
                });
    });
  });

  describe('delete a book : delete()', () => {
    it('should delete a book', () => {
      const Book = {
        destroy: td.function(),
      };

      td.when(Book.destroy({ where: { id: 1 } })).thenResolve({});

      const booksController = new BooksController(Book);

      return booksController.delete({ id: 1 })
                .then(response => {
                  expect(response.statusCode).to.be.eql(204);
                });
    });
  });
});
