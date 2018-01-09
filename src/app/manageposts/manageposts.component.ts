import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute ,Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { Location } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-manageposts',
  templateUrl: './manageposts.component.html',
  styleUrls: ['./manageposts.component.css']
})
export class ManagepostsComponent implements OnInit {
public topicData:any ={
  topic_title:'Manage Posts',
  start:0,
  limit:5
}

public posts:any;
public tabColorActive:string='grey';
public tabColorRejected:string='lightgrey';
public totalActivePosts:number;
public totalRejectedPosts:number;
public searchText:string;

  constructor(private location:Location,private dataService:DataService,private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.topicData.topic_id=this.activatedRoute.snapshot.paramMap.get('topic_id');
    this.getActivePosts();

    this.dataService.countApprovedPosts()
    .subscribe(data=>{
      this.totalActivePosts =data.count;
    });

    this.dataService.countRejectedPosts()
    .subscribe(data=>{
      this.totalRejectedPosts =data.count;
    });
  }

  onRejectedClick() {
    this.tabColorActive='lightgrey';
    this.tabColorRejected='grey';
    this.resetLimit();
    this.loadRejectedData();
  }

  getActivePosts() {
    this.tabColorActive='grey';
    this.tabColorRejected='lightgrey';
    this.resetLimit();
    this.loadActiveData();
  }

  onViewMoreClick() {
   this.increaseLimit(this.topicData.start,this.topicData.limit);
   if( this.tabColorRejected == 'grey') {
    this.loadRejectedData();
   } else {
    this.loadActiveData();
   }
  }

  resetLimit() {
    this.topicData.start=0;
    this.topicData.limit=5;
  }

  increaseLimit(start:number,limit:number) {
    this.topicData.start=start+5;
    this.topicData.limit=limit;
  }

  loadActiveData() {
    this.dataService.getAllApprovedPosts(this.topicData)
    .subscribe(data=>{
      if(this.topicData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined' ? this.posts=this.posts.concat(data):'';
      }
    })
  }

  loadRejectedData() {
    this.dataService.getRejectedPosts(this.topicData)
    .subscribe(data=>{
      if(this.topicData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined'? this.posts=this.posts.concat(data):'';
      }
     
    })
  }

  onAddnewissueClick() {
    this.router.navigate(['/content/newissue', { topic_id:this.topicData.topic_id, title: this.topicData.topic_title}]);
  }

  onPostClick(postData:any) {
    this.router.navigate(['/content/postAnswer', { post_id: postData.post_id,description:postData.description,title:postData.title,solution:postData.solution}]);
  }

  onDeletePostClick(value:any) {
    var data = {
      post_id : value.post_id
    }
      this.dataService.deletePosts(data)
      .subscribe(data =>{
        this.totalActivePosts-=1;
       this.getActivePosts();
      });
  }

  backButtonClicked() {
    this.location.back();
}

onsearchButtonClick() {
  var keywordsArray =this.searchText.trim().split(' ');
  keywordsArray=keywordsArray.filter(function(n){ return n != "" });
 
  var data = {
    keywords:keywordsArray
  }

  this.dataService.searchPosts(data)
  .subscribe(data=>{
    this.posts = data;
  });
}



}
