import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-usernotifications',
  templateUrl: './usernotifications.component.html',
  styleUrls: ['./usernotifications.component.css']
})
export class UsernotificationsComponent implements OnInit {

  public posts:any=[];
  public topicData:any= {
    start:0,
    limit:5
  };

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.topicData.topic_id = this.dataService.userData.interest;
    this.loadNewPosts();
  }

  loadNewPosts() {
    var data = {
        user_id:parseInt(localStorage.getItem('user_id')),
        topic_id:this.topicData.topic_id,
        start:this.topicData.start,
        limit:this.topicData.limit
    }

    this.dataService.getLatestTopicPostsForUser(data)
    .subscribe(data=>{
      if(this.topicData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined' ? this.posts=this.posts.concat(data):'';
      }
    })
  }

  onViewMoreClick(){
    this.topicData.start=this.topicData.start+5;
    this.loadNewPosts();
  }

}
