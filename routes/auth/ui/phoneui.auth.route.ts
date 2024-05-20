/**
 * Dependencies
 */
import express from "express";
import path from "path";
import fs from "fs";

/**
 * Model
 */
import Model from "./phoneui.auth.model";

const router = express.Router();

router.use(Model.path, express.static(path.join(__dirname, "public")));
// router.use(
//     Model.path,
//     (req, res, next) => {

//         res.sendFile(path.join(__dirname + '/index.html'));
//     }
// );

export default router;
