import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import {PopupModule} from 'ng2-opd-popup';
import { Location } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { Approute } from './app.routing'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpModule, Http, RequestOptions, ConnectionBackend } from '@angular/http';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './title/title.component';
import { ContentareaComponent } from './contentarea/contentarea.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { TopicshomeComponent } from './topicshome/topicshome.component';
import { PostslistComponent } from './postslist/postslist.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AddnewissueComponent } from './addnewissue/addnewissue.component';
import { HistoryComponent } from './history/history.component';
import { TestService } from './services/test.service';
import { DataService } from './services/data.service';
import { ApphttpService } from './services/apphttp.service';
import { ViewpostanswerComponent } from './viewpostanswer/viewpostanswer.component';
import { UsernotificationsComponent } from './usernotifications/usernotifications.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminnotificationsComponent } from './adminnotifications/adminnotifications.component';
import { ApproveissueComponent } from './approveissue/approveissue.component';
import { RejectpostComponent } from './rejectpost/rejectpost.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';
import { AdminuserviewComponent } from './adminuserview/adminuserview.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ManagepostsComponent } from './manageposts/manageposts.component';

import { LoginrouteguardService } from './services/loginrouteguard.service';
import { LoggedinrouteguardService } from './services/loggedinrouteguard.service';
import { AdminroleguardService } from './services/adminroleguard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    tokenName:'token',
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpasswordComponent,
    SignupComponent,
    FooterComponent,
    TitleComponent,
    ContentareaComponent,
    AppheaderComponent,
    TopicshomeComponent,
    PostslistComponent,
    TruncatePipe,
    SearchbarComponent,
    AddnewissueComponent,
    HistoryComponent,
    ViewpostanswerComponent,
    UsernotificationsComponent,
    UserprofileComponent,
    AdminnotificationsComponent,
    ApproveissueComponent,
    RejectpostComponent,
    ManageusersComponent,
    ChangepasswordComponent,
    AddnewuserComponent,
    AdminuserviewComponent,
    EditprofileComponent,
    ManagepostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Approute),
    HttpModule,
    MomentModule,
    PopupModule,
    StarRatingModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    TestService,
    DataService,
    ApphttpService,
    Location,
    LoginrouteguardService,
    LoggedinrouteguardService,
    AdminroleguardService
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
