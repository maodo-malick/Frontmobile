import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient} from '@angular/common/http';


const host = environment.host;
@Injectable({
  providedIn: 'root'
})
export class CalculeFraisService {
  constructor( private httpClient: HttpClient) { }
  calcul(montant: any)
  {
    return this.httpClient.post( `${host}admin/frais`, montant);
  }
}
