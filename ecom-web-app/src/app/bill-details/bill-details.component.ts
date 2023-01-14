import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Bill, BillDetail} from "../model/bill.model";
import {BillService} from "../services/bill.service";

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  bill!: Bill;
  billId!:number;
  errorMessage!:string;
  constructor(private billService: BillService,private router:Router,private route:ActivatedRoute ) {
    this.billId=route.snapshot.params['billId'];
    console.log(this.billId);
  }

  /*ngOnInitOld(): void {
    this.http.get("http://localhost:8888/BILLING-SERVICE/fullbill/"+this.billId)
      .subscribe({ next : (data)=>{
          this.billdetails= data;
        },
        error : (err)=>{}
      });
  }*/
  ngOnInit(): void {
     this.billService.getBillDetails(this.billId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    ).subscribe(res=>{
      console.log(res);
       this.bill=res;
     });;
  }

}

