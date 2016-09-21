import httpStatus from 'http-status';

const defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode
});

const errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse({
    error: message
}, statusCode);

class UsersController {
    constructor(User) {
        this.User = User;
    }

    findAll() {
        return this.User.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    findById(params) {
        return this.User.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    create(data) {
        return this.User.create(data)
            .then(result => defaultResponse(result, httpStatus.CREATED))
            .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.User.update(data, { where: params })
            .then(result => defaultResponse(result, 200))
            .catch(error => errorResponse(error.message, httpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.User.destroy({ where: params })
            .then(() => defaultResponse({}, httpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message));
    }
}

export default UsersController;
