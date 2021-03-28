import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private http: HttpClient) { }

  communes() : Observable<any> {
    return this.http.get(environment.urlApi + '/listCommune');
  }

  streetNames(commune: string, userInput: string): Observable<any> {
    if (commune && userInput) {
      return this.http.get(environment.urlApi + '/commune/' + commune + '/listAdresse/' + userInput);
    }
    return of([]);
  }

  streetNumbers(commune: string, streetName: string): Observable<any> {
    if (commune && streetName) {
      return this.http.get(environment.urlApi + '/commune/' + commune + '/adresse/' + streetName + '/listeNumero');
    }
    return of([]);
  }




}
