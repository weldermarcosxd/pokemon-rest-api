import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default app => {
  const User = app.datasource.models.User;
  const opts = {};

  opts.secretOrKey = app.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  const strategy = new Strategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession)
  };
};
