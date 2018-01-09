import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnotifications',
  templateUrl: './adminnotifications.component.html',
  styleUrls: ['./adminnotifications.component.css']
})
export class AdminnotificationsComponent implements OnInit {

  public posts:any=[];
  public limitData ={
    start:0,
    limit:5
  }



  constructor(private dataService:DataService,private location:Location,private router:Router) { }

  ngOnInit() {

    this.limitData.start=0;
    this.limitData.limit=5;

    this.loadNewPosts();
  }

  loadNewPosts() {
    this.dataService.getPostsWaitingForApprovals(this.limitData)
    .subscribe(data=>{
      if(this.limitData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined' ? this.posts=this.posts.concat(data):'';
      }
    })
  }

  onViewMoreClick(){
    this.limitData.start = this.limitData.start + 5;
    this.loadNewPosts();
  }

  onApproveLaterClick() {
    this.location.back();
  }

  onPostClick(data:any) {
    this.router.navigate(['/content/approveIssue', { post_id:data.post_id ,title:data.title , description:data.description,solution:data.solution,topic_id:data.topic_id}]);
  }

  backButtonClicked() {
    this.location.back();
  }

}
