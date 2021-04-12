import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
const host = environment.host;
@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor( private httpClient: HttpClient) { }
  Deposer(data: any): Observable<any>
  {
    return this.httpClient.post<any>(`${host}transactions`, data);
  }
  getDateUpdate()
  {
    return this.httpClient.get(`${host}admin/user`);
  }
}
