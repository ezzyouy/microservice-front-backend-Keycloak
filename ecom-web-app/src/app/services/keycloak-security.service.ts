

import { Injectable } from '@angular/core';
import {KeycloakInstance} from "keycloak-js";
import {HttpClient,HttpHeaders} from "@angular/common/http";
declare var Keycloak:any;

@Injectable({ providedIn: 'root'})
export class KeycloakSecurityService {
  public kc!:KeycloakInstance;
  constructor() {}
   async init() {
     console.log("Security Initialized!");
     this.kc = new Keycloak({
       url: "http://localhost:8080/",
       realm: "ecom-web-realm",
       clientId: "billing-client"
     });
     try {
       await this.kc.init({
         onLoad: "check-sso"
       });
     }
     catch (e) {
       this.kc.login();
     }

   }

}