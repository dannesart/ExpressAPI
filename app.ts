/** 00000000000        00000000000000   0000      0000    0000      0000     0000000000000
    0000000000000      00000000000000   0000      0000    0000      0000     0000000000000
    0000      0000     0000              0000    0000      0000    0000      0000     0000
    0000      0000     0000               0000  0000        0000  0000       0000     0000
    0000000000000      0000000000          00000000          00000000        0000     0000
    00000000000        0000000000           000000            000000         0000000000000
    0000               0000                  0000              0000          0000000000000
    0000               0000                  0000              0000          0000     0000
    0000               00000000000000        0000              0000          0000     0000
    0000               00000000000000        0000              0000          0000     0000
  */

/**
 * Dependencies
 */
import express from "express";
import "module-alias/register";
import dotenv from "dotenv";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import timeout from "connect-timeout";
import rateLimiter from "express-rate-limit";

/**
 * Services
 */

import DatabaseService from "@/utils/db";

/**
 * Routes
 */
import Routes, { swaggerVersion } from "./routes";

/**
 * Defining APP
 */

const app = express();

// dot env configuration
dotenv.config();

// Check if db is needed here
DatabaseService.connect()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => console.log(error));

app.use(timeout("30s"));

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.use(helmet());

// Connections limit
const limiter = rateLimiter({
  windowMs: 10000,
  max: 200,
  message: "Too many requests from this IP, please try again",
});

app.use(limiter);

// Headers

app.use((req, res, next) => {
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Host, Origin, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, peyyaUserId, bicFi, consentId, consentAuthId, clientid, clientsecret"
  );

  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    req.headers.origin || req.headers.host || "dev-ibqj5g5m.us.auth0.com"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Allow to expose authorization
  res.setHeader("Access-Control-Expose-Headers", "Authorization");
  next();
});

app.all("/", async (req, res) => res.redirect(`/${swaggerVersion}`));

// App use our routes
app.use(`/${swaggerVersion}`, Routes);

export default app;
