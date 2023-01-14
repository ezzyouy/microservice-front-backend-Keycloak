import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public  getCustomer():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://localhost:8888/CUSTOMER-SERVICE/customers/?projection=fullcustomer")
      .pipe(map((result:any)=>{
        return result._embedded.customers; //just return "customers"
      }));
  }
}
