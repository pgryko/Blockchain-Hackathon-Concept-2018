/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import { renderToString } from 'react-dom/server';


// const usersController = controllers && controllers.users;
const roomsController = controllers && controllers.rooms;

export default (app) => {
  // user routes
  // if (usersController) {
  //   app.post('/login', usersController.login);
  //   app.post('/signup', usersController.signUp);
  //   app.post('/logout', usersController.logout);
  // } else {
  //   console.warn(unsupportedMessage('users routes'));
  // }
  //
  // if (passportConfig && passportConfig.google) {
  //   // google auth
  //   // Redirect the user to Google for authentication. When complete, Google
  //   // will redirect the user back to the application at
  //   // /auth/google/return
  //   // Authentication with google requires an additional scope param, for more info go
  //   // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  //   app.get('/auth/google', passport.authenticate('google', {
  //     scope: [
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //       'https://www.googleapis.com/auth/userinfo.email'
  //     ]
  //   }));
  //
  //   // Google will redirect the user to this URL after authentication. Finish the
  //   // process by verifying the assertion. If valid, the user will be logged in.
  //   // Otherwise, the authentication has failed.
  //   app.get('/auth/google/callback',
  //     passport.authenticate('google', {
  //       successRedirect: '/',
  //       failureRedirect: '/login'
  //     })
  //   );
  // }

  // room routes
  if (roomsController) {
    app.get('/room', roomsController.all);
    app.post('/room/:id', roomsController.addRoom);
    app.put('/room/:id', roomsController.update);
    app.delete('/room/:id', roomsController.remove);
  } else {
    console.warn(unsupportedMessage('rooms routes'));
  }

};
