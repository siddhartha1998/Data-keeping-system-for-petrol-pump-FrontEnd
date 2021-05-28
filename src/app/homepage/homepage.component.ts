import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_service/commonService';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private commonService : CommonService) { }
  ngOnInit(): void {
    
    this.commonService.isLoggedIn=false
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

 


}
