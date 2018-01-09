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
// title="";
public loggoutSuccess : boolean = false;
public loggoutFail : boolean = false;

  constructor(private dataservice:DataService,private appHttpService:ApphttpService,private router:Router) { 
 
  }

  ngOnInit() {
    //newly added
   this.user=this.dataservice.getUserData();
  
  }

  onSignout() {
    var data = {
      user_id : this.user.user_id
    }

    this.appHttpService.userLogout(data)
    .subscribe(data => {
      if(data.message) {
        this.loggoutSuccess = true;
        this.loggoutFail = false;
        this.appHttpService.isLoggedIn =false;
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

  onChangePassword() {
    this.router.navigate(['/content/changepassword']);
  }

  onManageUsersClick() {
    this.router.navigate(['/content/manageusers']);
  }

  viewPosts(user) {
    this.router.navigate(['/content/adminuserview',{ user_id: this.user.user_id,title:'Questions Answered and Asked yourself'}]);
   }

   onEditprofileClick(user) {
     this.router.navigate(['/content/editprofile',{ user_id: user.user_id, user_name: user.username,isAdmin:user.isAdmin , notify:user.notify,email:user.email,interest:user.interest ,empID:user.empID }]);
   }

   onManagePostsClick(user) {
     this.router.navigate(['/content/manageposts',{topic_id : user.interest}]);
   }


}
