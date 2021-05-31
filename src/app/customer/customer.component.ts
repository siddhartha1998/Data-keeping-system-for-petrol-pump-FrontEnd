import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../_service/commonService';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  page: number = 1;
  customerDetail:any;
  id:any;
  name:any;
  address:any;
  customerName:any;
  customerAddress:any;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="After delete confirmed you cannot undo this operation";
  cancelClicked=false;

  constructor( private router : Router,
                      private http : HttpClient,
                      private snackBar : MatSnackBar,
                      private commonService : CommonService

                     ) { }

  ngOnInit(): void {
    this.viewCustomer();
    this.commonService.isLoggedIn=true;
  }

 key:string='id';
 reverse:boolean=false;
 sort(key:string){​​​​​
 this.key=key;
 this.reverse= !(this.reverse);
}​​​​​

  //view all customer Detail
  viewCustomer(){
    this.http.get("https://localhost:5001/api/Customer").subscribe(
      res=>{
        this.customerDetail=res;
    
      },
      err=>{
        console.log(err);
        
        
      }
    );
  }

  //add new customer
  addCustomer(){
    this.http.post("https://localhost:5001/api/Customer",{name:this.customerName,address:this.customerAddress},{responseType:'json'}).subscribe(
res=>{
  this.customerDetail=res;
  
  this.snackBar.open("Customer detail Added Successfully", 'Dismiss', {
    duration: 4000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    panelClass: ['success-snackBar'],

  });
  this.ngOnInit();
},
err=>{
  this.snackBar.open("Something went wrong", 'Dismiss', {
    duration: 4000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    panelClass: ['red-snackBar'],

  });
  
}
    );
  }

  viewClicked(id:any){
    this.http.get("https://localhost:5001/api/Customer/" +id,{responseType:'json'}).subscribe(
      (res:any)=>{
      //  this.customerDetail=res[0];
      this.id=res[0].id;
        this.name=res[0].name;
        this.address=res[0].address;
        
      },
      (err:any)=>{
        console.log(err);
        
      }
    )
  }

  //edit Customer Detail
  editCustomer(id:any){
 this.http.put("https://localhost:5001/api/Customer/"+id,{name:this.name,address:this.address},{responseType:'json'}).subscribe(
   res=>{
    this.snackBar.open("Customer detail updated Successfully", 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],

    });
     this.ngOnInit();
   },
   err=>{
    this.snackBar.open("Something went wrong", 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['red-snackBar'],

    });
     
   }
 )
  }

  deleteCustomer(id:number){
    this.http.delete("https://localhost:5001/api/Customer/"+id,{responseType:'json'}).subscribe(
      res=>{
        this.snackBar.open("Customer Deleted Successfully!", 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['red-snackBar'],
    
        });

        this.ngOnInit();
        
      },
      err=>{
        console.log(err);
        
      }
    )
  }

}
