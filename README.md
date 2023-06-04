# RoAuth.JS

![npm](https://img.shields.io/npm/v/roauth.js)

RoAuthJS, a simple promise-based node library.

## Disclaimers

**As of now, ROBLOX's OAuth system is currently open to alpha-testers and people with Verified IDs**

This is super WIP as I only started working on it a few days ago! Just a basic API wrapper.

This is also my first project in typescript, so it may not be as good as you'd expect, and one of my first promise-based libs ever!

# Examples

### Express with OAuth (show profile info)

No secret is required.

```js
const roauth = require("roauth.js");
const { ResponseType } = require("roauth.js");
const express = require("express");

let id = "1234";
let secret = "RBX-...a82E";

var app = express();

app.get("/entry", (req, res) => {
  res.redirect(
    RoAuthJS.makeAuthLink({
      ClientId: "ClientId",
      RedirectURI: "http://localhost:3000/redirect",
      Scopes: ["profile", "openid"],
      ResponseType: ResponseType.Code,
    })
  );
});

app.get("/redirect", (req, res) => {
  if (!req.query.code) return res.sendStatus(400);
  const code = req.query.code;

  RoAuthJS.tokens.make(code, id, secret).then((resp) => {
    RoAuthJS.user
      .getUserInfo(resp)
      .then((info) => {
        RoAuthJS.tokens
          .revoke(resp, id, secret)
          .then(() => {
            res.json(info);
          })
          .catch(() => {
            res.sendStatus(500);
          });
      })
      .catch(() => {
        res.sendStatus(500);
      });
  });
});

app.listen(3000, () => {
  console.log("Ready!");
});
```
