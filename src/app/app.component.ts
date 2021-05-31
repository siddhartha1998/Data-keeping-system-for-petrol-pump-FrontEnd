import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './_service/commonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'data-keeping-system-for-petrol-pump';
  constructor(private commonService : CommonService,
    private router:Router){}
isLoggedIn:Boolean= false;
  ngOnInit(){

 
  if(window.location.href == "http://localhost:4200/login" || window.location.href== "http://localhost:4200/" ){
    this.isLoggedIn = false;
  }else{
    this.isLoggedIn = true;
  }
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
 
  logout(){
window.location.replace("/login");
   // alert("logout");
  }

}
