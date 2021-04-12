import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const host = environment.host;
@Injectable({
  providedIn: 'root'
})
export class GetAccount {

  constructor( private httpClient: HttpClient) { }
  Account()
  {
    // @ts-ignore
    return this.httpClient.get(`${host}admin/users`);
  }
}
