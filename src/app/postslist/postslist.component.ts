import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute ,Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css'],
  providers:[]
})
export class PostslistComponent implements OnInit {
public topic_id:any;
public topic_title:any;
public posts:any=[];
public topicData:any;
public tabColorLatest:any='grey';
public tabColorMost:any='lightgrey';
  constructor(private dataService:DataService,private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.activatedRoute.queryParams
    .filter(params => params.topic_id)
    .subscribe(params => {
      this.topic_id = params.topic_id;
      this.topic_title = params.title;
    });

   this.topicData = {
      topic_id:this.topic_id,
      topic_title:this.topic_title,
      start:0,
      limit:5
    }
  this.getlatestPosts();
  }

  onMostAnsweredClick() {
    this.tabColorLatest='lightgrey';
    this.tabColorMost='grey';
    this.resetLimit();
    this.loadMostAnsweredData();
  }

  getlatestPosts() {
    this.tabColorLatest='grey';
    this.tabColorMost='lightgrey';
    this.resetLimit();
    this.loadLatestData();
  }

  onViewMoreClick() {
   this.increaseLimit(this.topicData.start,this.topicData.limit);
   if( this.tabColorMost == 'grey') {
    this.loadMostAnsweredData();
   } else {
    this.loadLatestData();
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

  loadLatestData() {
    this.dataService.getLatestTopicPosts(this.topicData)
    .subscribe(data=>{
      if(this.topicData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined' ? this.posts=this.posts.concat(data):'';
      }
    })
  }

  loadMostAnsweredData() {
    this.dataService.getMostAnsweredTopicPosts(this.topicData)
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
    console.error(postData);
    this.router.navigate(['/content/postAnswer', { post_id: postData.post_id,description:postData.description,title:postData.title,solution:postData.solution}]);
  }

}
