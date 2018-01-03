import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { ApphttpService } from '../services/apphttp.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  @Input() user;
title="Bring2End";
public loggoutSuccess : boolean = false;
public loggoutFail : boolean = false;

  constructor(private dataservice:DataService,private appHttpService:ApphttpService,private router:Router) { 
 
  }

  ngOnInit() {
   
  }

  onSignout() {
    var data = {
      user_id : this.user.userID
    }

    this.appHttpService.userLogout(data)
    .subscribe(data => {
      if(data.message) {
        this.loggoutSuccess = true;
        this.loggoutFail = false;
        setTimeout(()=>{
          this.loggoutSuccess = false;
          this.router.navigate(['/login']);
        },2000);
         
      } else {
        this.loggoutFail = true;
      }
     
    }
    );

  }


  onUserNotificationsClick() {
    this.router.navigate(['/content/userNotifications']);
  }

  onAdminNotificationsClick() {
    this.router.navigate(['/content/adminNotifications']);
  }


}
