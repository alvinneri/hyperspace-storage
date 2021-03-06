"use strict";

import config from "../config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import compose from "composable-middleware";
import User from "../models/users/user.model";

export const tokenExpiresIn = 60 * 60 * 5;

var validateJwt = expressJwt({
  secret: config.secrets.session,
  algorithms: ["RS256"],
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use(function (req, res, next) {
        // allow access_token to be passed through query parameter as well
        // @TODO: JWT Token shouldn't be pass via query
        if (req.query && req.query.hasOwnProperty("access_token")) {
          req.headers.authorization = "Bearer " + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function (req, res, next) {
        return User.findById(req.user._id)
          .exec()
          .then((user) => {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;
            next();
            return null;
          })
          .catch((err) => {
            next(err);
          });
      })
  );
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error("Required role needs to be set");
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (
        config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)
      ) {
        next();
      } else {
        res.status(403).send("Forbidden");
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role, email = "") {
  return jwt.sign(
    { _id: id, role: role, email: email },
    config.secrets.session,
    {
      expiresIn: tokenExpiresIn,
    }
  );
}
