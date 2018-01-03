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

export const Approute:Routes=[
   {
       path:'login',
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
    children: [
        { path: '', component: TopicshomeComponent },
        { path:'postlist', component:PostslistComponent},
        { path:'newissue', component:AddnewissueComponent},
        { path:'postAnswer', component:ViewpostanswerComponent},
        { path:'approveIssue', component:ApproveissueComponent},
        { path:'rejectPost', component:RejectpostComponent },
        { path:'userNotifications', component:UsernotificationsComponent},
        { path:'adminNotifications' , component:AdminnotificationsComponent }
      ]
  },
  {
      path:'content/:userdata',
      component:ContentareaComponent,
      children: [
        { path: '', component: TopicshomeComponent },
        { path:'postlist/:topic', component:PostslistComponent},
        { path:'postAnswer/:postdata', component:ViewpostanswerComponent},
        { path:'approveIssue/:postdata', component:ApproveissueComponent},
        { path:'rejectPost/:postData', component:RejectpostComponent }
      ]
  }
];