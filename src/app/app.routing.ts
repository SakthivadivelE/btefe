import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';
import { ContentareaComponent } from './contentarea/contentarea.component';
import { TopicshomeComponent } from './topicshome/topicshome.component';
import { PostslistComponent } from './postslist/postslist.component';
import { AddnewissueComponent } from './addnewissue/addnewissue.component';
import { ViewpostanswerComponent } from './viewpostanswer/viewpostanswer.component';
import { ApproveissueComponent } from './approveissue/approveissue.component';
import { RejectpostComponent } from './rejectpost/rejectpost.component';
import { UsernotificationsComponent } from './usernotifications/usernotifications.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdminuserviewComponent } from './adminuserview/adminuserview.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ManagepostsComponent } from './manageposts/manageposts.component';

import { LoginrouteguardService } from './services/loginrouteguard.service';
import { LoggedinrouteguardService } from './services/loggedinrouteguard.service';
import { AdminroleguardService } from './services/adminroleguard.service';

export const Approute:Routes=[
   {
       path:'login',
       canActivate : [LoggedinrouteguardService],
       component:LoginComponent
   },
   {
    path:'login/:registered',
    component:LoginComponent
   },
   {
       path:'',
       redirectTo:'login',
       pathMatch:'full'

   },
   {
       path:'forgotpassword',
       component:ForgotpasswordComponent
   },
   {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'content',
    component:ContentareaComponent,
    canActivate: [LoginrouteguardService],
    children: [
        { path: '', component: TopicshomeComponent },
        { path:'postlist', component:PostslistComponent},
        { path:'newissue', component:AddnewissueComponent},
        { path:'postAnswer', component:ViewpostanswerComponent},
        { path:'approveIssue', component:ApproveissueComponent, canActivate: [AdminroleguardService]},
        { path:'rejectPost', component:RejectpostComponent, canActivate: [AdminroleguardService] },
        { path:'userNotifications', component:UsernotificationsComponent},
        { path:'adminNotifications' , component:AdminnotificationsComponent, canActivate: [AdminroleguardService] },
        { path:'changepassword' , component:ChangepasswordComponent },
        { path:'adminuserview' , component:AdminuserviewComponent, canActivate: [AdminroleguardService] },
        { path:'manageusers' , component:ManageusersComponent, canActivate: [AdminroleguardService] },
        { path:'addnewuser' , component:AddnewuserComponent, canActivate: [AdminroleguardService] },
        { path:'editprofile' , component:EditprofileComponent },   
        { path:'manageposts' , component:ManagepostsComponent, canActivate: [AdminroleguardService] }
    ]
  },
  {
      path:'content/:userdata',
      canActivate: [LoginrouteguardService],
      component:ContentareaComponent,
      children: [
        { path: '', component: TopicshomeComponent },
        { path:'postlist/:topic', component:PostslistComponent},
        { path:'postAnswer/:postdata', component:ViewpostanswerComponent},
        { path:'approveIssue/:postdata', component:ApproveissueComponent},
        { path:'rejectPost/:postData', component:RejectpostComponent },
        { path:'adminuserview/:data' , component:AdminuserviewComponent },
        { path:'editprofile/:userdata' , component:EditprofileComponent } ,
        { path:'manageposts/:topicData' , component:ManagepostsComponent }  
      ]
  }
];