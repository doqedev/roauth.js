import fetch, { Headers } from 'node-fetch';
import { KeyResponse } from './index';

type userInfo = {
    userId: number,
    profile: string, // kind of brute force the profile scope, as the "sub" variable is already available.
    profileShort: string, // https://rblx.name/{userid}
    name?: string, // either the normal name or the display name
    displayName?: string,
    username?: string,
    hasDisplayName?: boolean // a custom variable if a display name is used.
    createdAt?: Date,
}

export function getUserInfo(accessTokenOrResponse: string | KeyResponse): Promise<userInfo>{
    var headers = new Headers();

    if(typeof accessTokenOrResponse == "string") {
        headers.append("Authorization", "Bearer " + accessTokenOrResponse)
    }else{
        headers.append("Authorization", "Bearer " + accessTokenOrResponse.access_token)
    }

    var requestOptions = {
        method: 'GET',
        headers: headers,
    };

    return new Promise((res, rej) => {
        fetch("https://apis.roblox.com/oauth/v1/userinfo", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.hasOwnProperty("error")) return rej(result);
            result["userId"] = result["sub"]
            result["profile"] = `https://www.roblox.com/users/${result.userId}/profile`
            result["profileShort"] = `https://rblx.name/${result.userId}`

            if(result.hasOwnProperty("name")){
                result["displayName"] = result["nickname"]
                result["username"] = result["preferred_username"]

                result["hasDisplayName"] = (result.displayName == result.username) ? false : true

                result["createdAt"] = new Date(result["created_at"] * 1000)

                delete result["nickname"]
                delete result["preferred_username"]
                delete result["created_at"]
            }

            delete result["sub"]
            
            res(result)
        })
        .catch(error => console.log('error', error));
    })
}