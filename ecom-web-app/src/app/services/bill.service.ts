import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Bill} from "../model/bill.model";
import {ActivatedRoute} from "@angular/router";
import {KeycloakSecurityService} from "./keycloak-security.service";

@Injectable({
  providedIn: 'root'
})
export class BillService {
  bills !: Bill[];

  constructor(private http: HttpClient,public sec:KeycloakSecurityService) {}

  public getBill(customerId:number):Observable<Bill[]>{
    console.log("hello from bill service");
    return this.http.get<Bill[]>("http://localhost:8888/BILLING-SERVICE/byCustomerId/"+customerId,
      {headers:new HttpHeaders({'Authorization':'Bearer'+this.sec.kc.token})});

  }
  public getBillDetails(billId:number):Observable<Bill>{
    console.log("hello from bill service");
    /* Remplacer par interceptors
    return this.http.get<Bill>("http://localhost:8888/BILLING-SERVICE/fullbill/"+billId,
      {headers:new HttpHeaders({'Authorization':'Bearer'+this.sec.kc.token})});*/
    return this.http.get<Bill>("http://localhost:8888/BILLING-SERVICE/fullbill/"+billId);
  }
}
