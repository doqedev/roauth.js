import fetch, { Headers } from 'node-fetch';
import { KeyResponse } from './index';

type error = {
  error: string,
  error_description: string
}

export function revoke(refreshTokenOrResponse: string | KeyResponse, clientId: string, clientSecret: string): Promise<void | error>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  var urlencoded = new URLSearchParams();
  urlencoded.append("client_id", clientId);
  urlencoded.append("client_secret", clientSecret);
  if(typeof refreshTokenOrResponse == "string") {
    urlencoded.append("token", refreshTokenOrResponse)
  }else{
    urlencoded.append("token", refreshTokenOrResponse.refresh_token)
  }
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  return new Promise((res, rej) => {
    fetch("https://apis.roblox.com/oauth/v1/token/revoke", requestOptions)
      .then(response => response.text())
      .then((txt) => {
        if(txt.match('error')) return rej(JSON.parse(txt));
        res()
      })
      .catch(error => rej(error));
  })
}

export function refresh(refreshTokenOrResponse: string | KeyResponse, clientId: string, clientSecret: string): Promise<KeyResponse> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "refresh_token");
  urlencoded.append("client_id", clientId);
  urlencoded.append("client_secret", clientSecret);

  if(typeof refreshTokenOrResponse == "string") {
    urlencoded.append("refresh_token", refreshTokenOrResponse)
  }else{
    urlencoded.append("refresh_token", refreshTokenOrResponse.refresh_token)
  }

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  return new Promise((res, rej) => {
    fetch("https://apis.roblox.com/oauth/v1/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result["error"]) return rej(result);
        result.scopes = result.scope.split(" ")
        delete result["scope"]

        res(result)
      })
  })
}

export function make(code: string, clientId: string, clientSecret: string): Promise<KeyResponse> {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("client_id", clientId);
  urlencoded.append("client_secret", clientSecret);
  urlencoded.append("code", code)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  return new Promise((res, rej) => {
    fetch("https://apis.roblox.com/oauth/v1/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result["error"]) return rej(result);
        result.scopes = result.scope.split(" ")
        result.scope = null

        res(result)
      })
  })
}