import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { KeycloakSecurityService } from '../services/keycloak-security.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(private http:HttpClient,private sec:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8888/INVENTORY-SERVICE/products/?projection=fullproduct")
      .subscribe({ next : (data)=>{
                            this.products= data;
                         },
                          error : (err)=>{
                              if( err.status==401){
                                this.sec.kc.login();
                              }

                          }
                       });

  }

}
