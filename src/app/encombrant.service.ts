import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncombrantService {

  constructor(private http: HttpClient) { }

  // nca/encombrants/commune/{commune}/adresse/{adresse}
  suggestionRdvByStreetName(commune: string, streetName: string): Observable<any> {
    if (commune && streetName) {
      return this.http.get(environment.urlApi + '/encombrants/commune/' + commune + '/adresse/' + streetName);
    }
    return of({});
  }

  // nca/encombrants/commune/{commune}/adresse/{adresse}/numero/{numero}
  suggestionRdv(commune: string, streetName: string, streetNumber: string) {
    if (commune && streetName && streetNumber) {
      return this.http.get(environment.urlApi + '/encombrants/commune/' + commune + '/adresse/' + streetName + '/numero/' + streetNumber);
    }
    return of({});
  }

  // nca/encombrants/rdv/commune/{commune}/adresse/{adresse}/complementAdresse/{complementAdresse} /zone/{zone}/date/{date}/nomUser/{nomUser}/numTel/{numTel}/detail/{detail}/email/{email}/date2rdv/{date2rdv}/detail2rdv/{detail2rdv}
  prendreRdv(commune: string, streetName: string, streetNumber: string, zone: string, date: string, userName: string, phone: string,  detail: string, email: string, dateDuRdv: string, dateDuRdvDetails: string) {

  }



}
