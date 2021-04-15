import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncombrantService {

  encombrantUserDetails = [{
      id: 1,
      title: "Petit mobilier",
      cpt: 0
    }, {
      id: 2,
      title: "Grand mobilier",
      cpt: 0
    }, {
      id: 3,
      title: "Petit électroménager",
      cpt: 0
    }, {
      id: 4,
      title: "Grand électroménager",
      cpt: 0
    }, {
      id: 5,
      title: "Palette",
      cpt: 0
    }, {
      id: 6,
      title: "Informatique",
      cpt: 0
    }, {
      id: 7,
      title: "Ferraille",
      cpt: 0
    }, {
      id: 8,
      title: "Plache",
      cpt: 0
    }, {
      id: 9,
      title: "Tapis",
      cpt: 0
    }, {
      id: 10,
      title: "Sanitaire",
      cpt: 0
    }, {
      id: 11,
      title: "Literie",
      cpt: 0
    }, {
      id: 12,
      title: "Déco",
      cpt: 0
    }];
  
  constructor(private http: HttpClient) { }

  getEncombrantUserDetails(): Observable<any> {
    return of(this.encombrantUserDetails);
  }

  incrementEncombrantCpt(id): Observable<any> {
    let cardItem = this.encombrantUserDetails.find(x => x.id == id);
    cardItem.cpt += 1;
    return of (this.encombrantUserDetails);
  }

  decrementEncombrantCpt(id): Observable<any>{
    let cardItem = this.encombrantUserDetails.find(x => x.id == id);
    cardItem.cpt -= 1;
    return of (this.encombrantUserDetails);

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
