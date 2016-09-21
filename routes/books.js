import BooksController from '../controllers/books';

export default(app) => {
    const booksController = new BooksController(app.datasource.models.Book);
    app.route('/books')
    .all(app.auth.authenticate())
    .get((req, res) => {
        booksController.findAll()
          .then(respose => {
            res.status(respose.statusCode);
            res.json(respose.data);
          });
    })
    .post((req, res) => {
        booksController.create(req.body)
        .then(respose => {
          res.status(respose.statusCode);
          res.json(respose.data);
        });
    });

    app.route('/books/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      booksController.findById(req.params)
        .then(respose => {
          res.status(respose.statusCode);
          res.json(respose.data);
        });
    })
    .put((req, res) => {
        booksController.update(req.body, req.params)
            .then(respose => {
              res.status(respose.statusCode);
              res.json(respose.data);
            });
    })
    .delete((req, res) => {
        booksController.delete({
                where: req.params
            })
            .then(() => res.sendStatus(204))
            .catch(() => res.status(412));
    });
};
