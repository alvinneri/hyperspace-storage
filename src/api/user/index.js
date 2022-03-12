/* eslint-disable unicorn/prefer-module */
import { Router } from "express";

import * as auth from "../../auth/auth.service";
import { UserController } from "./ user.controller";

const router = new Router();

router.get("/", auth.hasRole("admin"), UserController.index);

module.exports = router;
