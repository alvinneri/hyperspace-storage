"use strict";

import express from "express";
import passport from "passport";

import { signToken } from "../auth.service";

const router = express.Router();

router.post("/", function (req, res, next) {
  passport.authenticate("local", async function (err, user, info) {
    infoLogger(`Authentication via passport local`, { email: user.email });
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "Something went wrong, please try again." });
    }

    const token = signToken(user._id, user.role, user.email);

    res.json({ token });
  })(req, res, next);
});

export default router;
