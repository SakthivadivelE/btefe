import { Component, OnInit } from '@angular/core';
import { ApphttpService } from '../services/apphttp.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  public passwordMatch:boolean = false;
  public userNotFound:boolean = false;
  public wrongOldPassword:boolean = false;
  public passwordChanged:boolean = false;
  public passwordChangeFailed:boolean = false;
  constructor(private apphttpService:ApphttpService,private router:Router,private location:Location) { }

  ngOnInit() {
  }

  onSubmit(value:any) {
   this.apphttpService.changePassword(value)
   .subscribe(data=>{
       switch(data.message) {
         case "Wrong old password":
                this.passwordMatch = false;
                this.userNotFound = false;
                this.wrongOldPassword = true;
                this.passwordChangeFailed=false;
       
          break;
         case "User not found":
                this.passwordMatch = false;
                this.userNotFound = true;
                this.wrongOldPassword = false;
                this.passwordChangeFailed=false;
              break;
         case "New password not match confirm password":
                this.passwordMatch = true;
                this.userNotFound = false;
                this.wrongOldPassword = false;
                this.passwordChangeFailed=false;
              break;

          case "success":
              this.passwordMatch = false;
              this.userNotFound = false;
              this.wrongOldPassword = false;
              this.passwordChanged = true;
              localStorage.setItem('token', data.token);
              setTimeout(()=>{
                this.location.back();
                this.passwordChanged = false;
              },2000);
             
            break;
          default:
            this.passwordChangeFailed=true;
          break;
                           
              
                           
                           
       }
   });
  }

}
