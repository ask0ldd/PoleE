import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  saveToken(token : string){
    // document.cookie = `token=${token}; HttpOnly; Secure; SameSite=Strict`
    localStorage.setItem("jobsToken", token)
  }

  getToken() : string | undefined{
    /*const matches = document.cookie.match(/(?<=token=).+?(?=; HttpOnly)/g);
    return matches ? matches[0] : undefined*/
    return localStorage.getItem("jobsToken") ?? undefined
  }

  flushToken() : void{
    // document.cookie = ``
    localStorage.removeItem("jobsToken")
  }
}
