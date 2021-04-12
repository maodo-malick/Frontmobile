import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
const host = environment.host;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private route: Router) {
  }
  loginUser(user) {
    return this.httpClient.post(`${host}login`, user).pipe(
      map((response: any) => {
        // console.log(response.token);
        localStorage.setItem('token', response.token);
        const data = jwt_decode(response.token);
        console.log(data);
        // const roles =  JSON.stringify(data);
        //  console.log(role);
        // @ts-ignore
        if (data.roles[0] === 'Role_AdminSystem') {
          this.route.navigate(['/acceuil']);
        }
      })
    );
  }
  getToken()
  {
    const token = localStorage.getItem('token');
    if (token)
    {
      return token ;
    }
  }
}
