import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const host = environment.host;
@Injectable({
  providedIn: 'root'
})
export class TransactService {

  constructor( private httpClient: HttpClient) { }
  myTransact()
  {
    // @ts-ignore
    return this.httpClient.get(`${host}transac_deeds`);
  }
}
