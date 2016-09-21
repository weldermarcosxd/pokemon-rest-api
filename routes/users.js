import UsersController from '../controllers/users';

export default(app) => {
    const usersController = new UsersController(app.datasource.models.User);
    app.route('/users')
    .all(app.auth.authenticate())
    .get((req, res) => {
        usersController.findAll()
          .then(respose => {
            res.status(respose.statusCode);
            res.json(respose.data);
          });
    })
    .post((req, res) => {
        usersController.create(req.body)
        .then(respose => {
          res.status(respose.statusCode);
          res.json(respose.data);
        });
    });

    app.route('/users/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersController.findById(req.params)
        .then(respose => {
          res.status(respose.statusCode);
          res.json(respose.data);
        });
    })
    .put((req, res) => {
        usersController.update(req.body, req.params)
            .then(respose => {
              res.status(respose.statusCode);
              res.json(respose.data);
            });
    })
    .delete((req, res) => {
        usersController.delete({
                where: req.params
            })
            .then(() => res.sendStatus(204))
            .catch(() => res.status(412));
    });
};
