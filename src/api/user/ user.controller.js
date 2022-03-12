"use strict";

import User from "../../models/user/user.model";

const index = (req, res) => {
  return User.find({}, "-salt -password")
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

export const UserController = {
  index,
};
