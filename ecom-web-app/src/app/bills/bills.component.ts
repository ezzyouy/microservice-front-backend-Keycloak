import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {BillService} from "../services/bill.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {Bill} from "../model/bill.model";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills !: Observable<Bill[]> ;
  errorMessage!:string;
  customerId!:number;
  constructor(private billService:BillService,private router:Router,private route:ActivatedRoute) {
    this.customerId=route.snapshot.params['customerId'];
  }

 /* ngOnInit(): void {
    this.http.get("http://localhost:8888/BILLING-SERVICE/byCustomerId/"+this.customerId)
      .subscribe({ next : (data)=>{
          this.bills= data;
        },
        error : ()=>{}
      });

  }*/
  ngOnInit(): void {
   this.bills= this.billService.getBill(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  getBillDetails(b: Bill) {
    this.router.navigateByUrl("/bill-details/"+b.id);
  }
}
