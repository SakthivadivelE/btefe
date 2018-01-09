import { Component, OnInit } from '@angular/core';
import { topics } from '../models';
import { ApphttpService } from '../services/apphttp.service';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {



  public topics:topics;
  public selectedTopic;
  public duplicateUsername:boolean=false;
  public duplicateEmail:boolean=false;
  public duplicateEmpID:boolean=false;
  public userAdded:boolean = false;
  public userData:any= {};
  public notify:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,private location:Location,private router:Router,private httpService:ApphttpService ,private dataService:DataService) { }

  ngOnInit() {

    this.dataService.getTopics()
    .subscribe(data=>{
     this.topics=data;
     this.selectedTopic=this.topics[0].title;
    });

    this.userData = {
      username : this.activatedRoute.snapshot.paramMap.get('user_name'),
      isAdmin : this.activatedRoute.snapshot.paramMap.get('isAdmin'),
      userID : this.activatedRoute.snapshot.paramMap.get('user_id'),
      empID:this.activatedRoute.snapshot.paramMap.get('empID'),
      notify:this.activatedRoute.snapshot.paramMap.get('notify'),
      email:this.activatedRoute.snapshot.paramMap.get('email'),
      interest:this.activatedRoute.snapshot.paramMap.get('interest'),
    }

    this.userData.email=this.userData.email.replace("@knowledgeq.com","");
    this.userData.email=this.userData.email.trim();

    if(this.userData.notify == 1) {
       this.notify = true;
    } else {
       this.notify = false;
    }
  
  }

  onSubmit(value:any) {
    var value=value;
    value.user_id = this.userData.userID;
    value.isAdmin = this.userData.isAdmin;
    this.httpService.editProfile(value)
    .subscribe(res=>{
      if(res.status == 200) {
        this.duplicateUsername = false;
        this.duplicateEmail = false;
        this.duplicateEmpID = false;
        this.userAdded = true;
        setTimeout(()=>{
            this.location.back();
            this.userAdded = false;
        },2000);
      } 
    },
    err => {
      if(err.error.includes('username')) {
          this.duplicateUsername = true;
          this.duplicateEmail = false;
          this.duplicateEmpID = false;
      } else if(err.error.includes('email')) {
          this.duplicateEmail = true;
          this.duplicateEmpID = false;
          this.duplicateUsername = false;
      } else if(err.error.includes('empID')) {
          this.duplicateEmpID = true;
          this.duplicateUsername = false;
          this.duplicateEmail = false;
      } else {
        console.error("Something went wrong");
      }
    }
  );
  }


}
