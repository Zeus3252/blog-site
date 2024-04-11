import {
  indexRouteHandler,
  userRouteHandler,
} from "../controllers/indexController";

var express = require("express");
var router = express.Router();

/* GET User. */
router.get("/users/", userRouteHandler);

/* POST Create User. */
router.post("/", indexRouteHandler);

export default router;
