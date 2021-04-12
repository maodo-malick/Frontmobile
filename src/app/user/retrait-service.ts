import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const host = environment.host;
@Injectable({
  providedIn: 'root'
})
export class RetraitService {

  constructor( private httpClient: HttpClient) { }
  transact(code: any)
  {
    return this.httpClient.post(`${host}transactions/transaction`, code);
  }
  retrait(code: any , cni: any)
  {
    // @ts-ignore
    return this.httpClient.post(`${host}retrait/transactions`, code, cni);
  }
}
