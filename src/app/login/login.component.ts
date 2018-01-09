import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ApphttpService } from '../services/apphttp.service';
import { userData } from '../models';
import {Router ,ActivatedRoute} from '@angular/router';
import { DataService } from '../services/data.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[]
})
export class LoginComponent implements OnInit {
  public userdata:userData;
  public loginForm:FormGroup;
  public wrongUsernamePassword:boolean=false;
  public serverError:boolean=false;
  public registered:boolean=false;
  constructor(private dataService:DataService,private apphttpService:ApphttpService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    
this.activatedRoute.params.subscribe(params => {
    this.registered=params['registered']; 
});

  }

  onSubmit(value:any) {
    this.apphttpService.userLogin(value).subscribe(data => {
      this.userdata = data;
     
    switch(this.userdata.error) {
      case null:
      this.apphttpService.setIsLoggedin(true);
      this.dataService.setUserData(this.userdata.user[0]);
       this.router.navigate(['/content', { user_id: this.userdata.user[0].user_id, user_name: this.userdata.user[0].username,isAdmin:this.userdata.user[0].isAdmin , notify:this.userdata.user[0].notify,email:this.userdata.user[0].email,interest:this.userdata.user[0].interest ,empID:this.userdata.user[0].empID }]);
       this.wrongUsernamePassword = false;
       this.serverError=false;
       break;
      case "Wrong username or password":
            this.wrongUsernamePassword = true;
      break;
      default:
            this.serverError = true;
      break;
    }
    });;
  }

  // onLogoutClick() {
  //   this.apphttpService.userLogout().subscribe(data=>{
  //     this.router.navigate(['/login']);
  //   }
  // )};

  onFP() {
    
  }

}
