"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = exports.refresh = exports.revoke = void 0;
const node_fetch_1 = __importStar(require("node-fetch"));
function revoke(refreshTokenOrResponse, clientId, clientSecret) {
    var myHeaders = new node_fetch_1.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", clientId);
    urlencoded.append("client_secret", clientSecret);
    if (typeof refreshTokenOrResponse == "string") {
        urlencoded.append("token", refreshTokenOrResponse);
    }
    else {
        urlencoded.append("token", refreshTokenOrResponse.refresh_token);
    }
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return new Promise((res, rej) => {
        (0, node_fetch_1.default)("https://apis.roblox.com/oauth/v1/token/revoke", requestOptions)
            .then(response => response.text())
            .then((txt) => {
            if (txt.match('error'))
                return rej(JSON.parse(txt));
            res();
        })
            .catch(error => rej(error));
    });
}
exports.revoke = revoke;
function refresh(refreshTokenOrResponse, clientId, clientSecret) {
    var myHeaders = new node_fetch_1.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("client_id", clientId);
    urlencoded.append("client_secret", clientSecret);
    if (typeof refreshTokenOrResponse == "string") {
        urlencoded.append("refresh_token", refreshTokenOrResponse);
    }
    else {
        urlencoded.append("refresh_token", refreshTokenOrResponse.refresh_token);
    }
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return new Promise((res, rej) => {
        (0, node_fetch_1.default)("https://apis.roblox.com/oauth/v1/token", requestOptions)
            .then(response => response.json())
            .then(result => {
            if (result["error"])
                return rej(result);
            result.scopes = result.scope.split(" ");
            delete result["scope"];
            res(result);
        });
    });
}
exports.refresh = refresh;
function make(code, clientId, clientSecret) {
    var myHeaders = new node_fetch_1.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("client_id", clientId);
    urlencoded.append("client_secret", clientSecret);
    urlencoded.append("code", code);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return new Promise((res, rej) => {
        (0, node_fetch_1.default)("https://apis.roblox.com/oauth/v1/token", requestOptions)
            .then(response => response.json())
            .then(result => {
            if (result["error"])
                return rej(result);
            result.scopes = result.scope.split(" ");
            result.scope = null;
            res(result);
        });
    });
}
exports.make = make;
