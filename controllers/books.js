import httpStatus from 'http-status';

const defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode
});

const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({
    error: message
}, statusCode);

class BooksController {
    constructor(Book) {
        this.Book = Book;
    }

    findAll() {
        return this.Book.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    findById(params) {
        return this.Book.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    create(data) {
        return this.Book.create(data)
            .then(result => defaultResponse(result, httpStatus.CREATED))
            .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.Book.update(data, { where: params })
            .then(result => defaultResponse(result, 200))
            .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.Book.destroy({ where: params })
            .then(() => defaultResponse({}, httpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message));
    }
}

export default BooksController;
