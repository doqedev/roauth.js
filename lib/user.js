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
exports.getUserInfo = void 0;
const node_fetch_1 = __importStar(require("node-fetch"));
function getUserInfo(accessTokenOrResponse) {
    var headers = new node_fetch_1.Headers();
    if (typeof accessTokenOrResponse == "string") {
        headers.append("Authorization", "Bearer " + accessTokenOrResponse);
    }
    else {
        headers.append("Authorization", "Bearer " + accessTokenOrResponse.access_token);
    }
    var requestOptions = {
        method: 'GET',
        headers: headers,
    };
    return new Promise((res, rej) => {
        (0, node_fetch_1.default)("https://apis.roblox.com/oauth/v1/userinfo", requestOptions)
            .then(response => response.json())
            .then(result => {
            if (result.hasOwnProperty("error"))
                return rej(result);
            result["userId"] = result["sub"];
            result["profile"] = `https://www.roblox.com/users/${result.userId}/profile`;
            result["profileShort"] = `https://rblx.name/${result.userId}`;
            if (result.hasOwnProperty("name")) {
                result["displayName"] = result["nickname"];
                result["username"] = result["preferred_username"];
                result["hasDisplayName"] = (result.displayName == result.username) ? false : true;
                result["createdAt"] = new Date(result["created_at"] * 1000);
                delete result["nickname"];
                delete result["preferred_username"];
                delete result["created_at"];
            }
            delete result["sub"];
            res(result);
        })
            .catch(error => console.log('error', error));
    });
}
exports.getUserInfo = getUserInfo;
