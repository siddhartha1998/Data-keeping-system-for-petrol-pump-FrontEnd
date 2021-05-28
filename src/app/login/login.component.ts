import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../_service/commonService';
import { User } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:any={};
  errorMessage='';
  isLoginFailed=false;
  isLoggedIn=false;
  username:any;
  password:any;
  user : User = new  User();

  constructor(private router : Router,
                  private commonService:CommonService) { }

  ngOnInit(): void {

  }

  Login(){
      if(this.user.username=="admin" && this.user.password=="admin" ){
        
        window.location.replace("/homepage");
        // this.router.navigate(['/homepage']);
       // window.location.reload();

      }
      else{
        this.isLoginFailed = true;
        this.errorMessage="your username and password is incorrect";
        
       
      }
    }

}
