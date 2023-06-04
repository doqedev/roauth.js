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
exports.user = exports.tokens = exports.makeAuthLink = exports.ResponseType = exports.Prompt = void 0;
const tokensLib = __importStar(require("./tokens"));
const userLib = __importStar(require("./user"));
var Prompt;
(function (Prompt) {
    Prompt["None"] = "none";
    Prompt["Login"] = "login";
    Prompt["Consent"] = "consent";
    Prompt["SelectAccount"] = "select_account";
})(Prompt = exports.Prompt || (exports.Prompt = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["None"] = "none";
    ResponseType["Code"] = "code";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
function makeAuthLink(options) {
    const final = {
        client_id: options.ClientId,
        redirect_uri: options.RedirectURI,
        scope: !!(options.Scopes) ? options.Scopes.join(" ") : undefined,
        response_type: options.ResponseType,
        prompt: options.Prompt,
        nonce: options.Nonce,
        state: options.State,
        code_challenge: options.CodeChallenge,
        code_challenge_method: options.CodeChallengeMethod
    };
    const queryParams = [];
    for (const key in final) {
        if (final.hasOwnProperty(key) && final[key] != undefined && final[key] != null) {
            const value = encodeURIComponent(final[key]);
            const param = `${encodeURIComponent(key)}=${value}`;
            queryParams.push(param);
        }
    }
    return `https://apis.roblox.com/oauth/v1/authorize?` + queryParams.join("&");
}
exports.makeAuthLink = makeAuthLink;
exports.tokens = tokensLib;
exports.user = userLib;
