import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncombrantService {

  encombrantUserDetails = [{
      title: "Petit mobilier",
      cpt: 0
    }, {
      title: "Grand mobilier",
      cpt: 0
    }, {
      title: "Petit électroménager",
      cpt: 0
    }, {
      title: "Grand électroménager",
      cpt: 0
    }, {
      title: "Palette",
      cpt: 0
    }, {
      title: "Informatique",
      cpt: 0
    }, {
      title: "Ferraille",
      cpt: 0
    }, {
      title: "Plache",
      cpt: 0
    }, {
      title: "Tapis",
      cpt: 0
    }, {
      title: "Sanitaire",
      cpt: 0
    }, {
      title: "Literie",
      cpt: 0
    }, {
      title: "Déco",
      cpt: 0
    }];
  
  constructor(private http: HttpClient) { }

  getEncombrantUserDetails(): Observable<any> {
    return of(this.encombrantUserDetails);
  }

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
