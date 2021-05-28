import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

 itemName:any;
 quantity:any;
 rate:any;
 total:any;
 remarks:any;
 date:any;
id:any;
  salesDetail:any;
  customerId:any;
  time:any;

  page: number = 1;

  public totalSum:any = 0;
  public rateFromAdd:any = 0;
  public quantityFromAdd:any = 0;

  popoverTitle:string="Are you sure you want to delete?";
  popoverMessage:string="After delete confirmed you cannot undo this operation";
  cancelClicked=false;

  customerDetail:any[]=[];

  constructor(private http : HttpClient, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.viewSalesDetail();
  }
  //reload the page
refresh() {
  window.location.reload();
}

key:string='id';
reverse:boolean=false;
sort(key:string){​​​​​
this.key=key;
this.reverse= !(this.reverse);
}

  viewSalesDetail(){
    this.http.get("https://localhost:5001/api/Sales").subscribe(
      res=>{
        this.salesDetail=res;
        
        for(let i = 0; i< this.salesDetail.length; i++){
          this.http.get("https://localhost:5001/api/Customer/"+ this.salesDetail[i].customerId, {responseType:'json'}).subscribe(
            (res:any) =>{
              this.salesDetail[i].customers = res[0].name;
              // console.log(res);
            },
            err =>{
              this.snackBar.open("Something went wrong", 'Dismiss', {
                duration: 4000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: ['red-snackBar'],
         
              });
            }
          );
        }
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  viewSalesById(id:number){
    this.http.get("https://localhost:5001/api/Sales/" +id, {responseType:'json'}).subscribe(
      (res:any)=>{
        // this.salesDetail=res;
        // console.log(res);
        // console.log(res.id);
        this.id=res.id;
        this.date=res.date;
        this.itemName=res.itemName;
        this.quantity=res.quantity;
        this.rate=res.rate;
        this.total=res.total;
        this.remarks=res.remarks;
        
        this.quantityFromAdd = res.quantity;
        this.rateFromAdd = this.rate;
        this.totalSum = res.total;
      },
      (err:any)=>{
        console.log(err);
        
      }
    
    );

  }

  deleteSales(id:any){
    this.http.delete("https://localhost:5001/api/Sales/" +id, {responseType:'json'}).subscribe(
      res=>{
        console.log(res);
        this.refresh();
      },
      err=>{
        console.log(err);
        
      }
    )

  }
  changeCustomerHandler(event:any){
      this.customerId = parseInt(event.target.value);
  }
  
  changeItemHandler(event:any){
    this.itemName = event.target.value;
  }

  getAllCustomers(){
      this.http.get("https://localhost:5001/api/Customer").subscribe(
        (res:any) =>{
              this.customerDetail = res;
        },
        err =>{
          console.log(err);
        }
      );
  }

  editSales(id:any){
    this.http.put("https://localhost:5001/api/Sales/"+id,
         {itemName:this.itemName,quantity:parseInt(this.quantityFromAdd),rate:parseInt(this.rateFromAdd),total:parseInt(this.totalSum),remarks:this.remarks},
         {responseType:'json'}).subscribe(

          res=>{
            this.snackBar.open("Sales detail updated Successfully", 'Dismiss', {
              duration: 4000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['success-snackBar'],
        
            });
              this.ngOnInit();
            // this.refresh();
          },
          err=>{
            this.snackBar.open("Something went wrong", 'Dismiss', {
              duration: 4000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: ['red-snackBar'],
        
            });
            this.ngOnInit();
          }  
    );

  }

  calculate(){

        this.rateFromAdd = parseInt(this.rateFromAdd);
        this.quantityFromAdd = parseInt(this.quantityFromAdd);

        this.totalSum = this.rateFromAdd * this.quantityFromAdd;

  }

  createSales(){
    this.date = this.date+"T"+this.time;
    this.http.post("https://localhost:5001/api/Sales",{customerId:this.customerId, itemName:this.itemName,
    quantity:this.quantityFromAdd,
  rate:this.rateFromAdd,
total:this.totalSum,
remarks:this.remarks,
date:this.date }).subscribe(
  res =>{
    this.snackBar.open("Sales Detail Added Successfully!", 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],

    });
    this.ngOnInit();
  },
  err =>{
    this.snackBar.open("Something went wrong", 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['red-snackBar'],

    });
    this.ngOnInit();
  }
);
  }

}
