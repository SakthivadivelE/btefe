import { Component, OnInit } from '@angular/core';
import { topics } from '../models';
import { ApphttpService } from '../services/apphttp.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent implements OnInit {


  public topics:topics;
  public selectedTopic;
  public duplicateUsername:boolean=false;
  public duplicateEmail:boolean=false;
  public duplicateEmpID:boolean=false;
  public userAdded:boolean = false;

  constructor(private location:Location,private router:Router,private httpService:ApphttpService ,private dataService:DataService) { }

  ngOnInit() {

    this.dataService.getTopics()
    .subscribe(data=>{
     this.topics=data;
     this.selectedTopic=this.topics[0].title;
    });
   
  }

  onSubmit(value:any) {
    this.httpService.userRegistration(value)
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
