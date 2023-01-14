import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {KeycloakSecurityService} from "../services/keycloak-security.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

   customers !: Observable<Customer[]> ;
  errorMessage!:string;
  constructor(public sec:KeycloakSecurityService,private  customerService: CustomerService, private router: Router) { }

  /*ngOnInitOld(): void {
    this.http.get("http://localhost:8888/CUSTOMER-SERVICE/customers/?projection=fullcustomer")
      .subscribe({ next : (data)=>{
          this.customers= data;
        },
        error : ()=>{}
      });
  }*/
  ngOnInit(): void {
     this.customers=this.customerService.getCustomer().pipe(
       catchError(err =>{
         this.errorMessage=err.message;
         return throwError(err);
       })
     );

  }


  getBills(c: Customer) {
    this.router.navigateByUrl("/bills/"+c.id);
  }
}
