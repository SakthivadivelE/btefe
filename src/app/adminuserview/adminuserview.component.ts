import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminuserview',
  templateUrl: './adminuserview.component.html',
  styleUrls: ['./adminuserview.component.css']
})
export class AdminuserviewComponent implements OnInit {
  public userData:any={};
  public posts:any;
  public tabColorAll:string='grey';
  public tabColorAnswered:string='lightgrey';
  public tabColorAsked:string='lightgrey';

  constructor(private location:Location,private router:Router,private activatedRoute:ActivatedRoute,private dataService:DataService) { }

  ngOnInit() {

    this.userData = {
      user_id:this.activatedRoute.snapshot.paramMap.get('user_id'),
      title:this.activatedRoute.snapshot.paramMap.get('title'),
      start:0,
      limit:5
    }
    this.getAllPosts();
  } 

  onAnsweredClick() {
    this.tabColorAll='lightgrey';
    this.tabColorAsked='lightgrey';
    this.tabColorAnswered='grey';
    this.resetLimit();
    this.loadAnsweredData();
  }

  onAskedClick() {
    this.tabColorAll='lightgrey';
    this.tabColorAsked='grey';
    this.tabColorAnswered='lightgrey';
    this.resetLimit();
    this.loadAskedData();
  }

  getAllPosts() {
    this.tabColorAll='grey';
    this.tabColorAsked='lightgrey';
    this.tabColorAnswered='lightgrey';
    this.resetLimit();
    this.loadAllData();
  }

  onViewMoreClick() {
   this.increaseLimit(this.userData.start,this.userData.limit);
   if( this.tabColorAnswered == 'grey') {
    this.loadAnsweredData();
   } else if(this.tabColorAsked == 'grey') {
     this.loadAskedData();
   } else {
    this.loadAllData();
   }
  }

  resetLimit() {
    this.userData.start=0;
    this.userData.limit=5;
  }

  increaseLimit(start:number,limit:number) {
    this.userData.start=start+5;
    this.userData.limit=limit;
  }

  loadAllData() {
    this.dataService.listuserPosts(this.userData)
    .subscribe(data=>{
      if(this.userData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined' ? this.posts=this.posts.concat(data):'';
      }
    })
  }

  loadAnsweredData() {
    this.dataService.listuserAnsweredPosts(this.userData)
    .subscribe(data=>{
      if(this.userData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined'? this.posts=this.posts.concat(data):'';
      }
     
    })
  }

  loadAskedData() {
    this.dataService.listuserAskedPosts(this.userData)
    .subscribe(data=>{
      if(this.userData.start == 0) {
        this.posts=data;
      } else {
        typeof data[0] !== undefined && typeof data[0] !== 'undefined'? this.posts=this.posts.concat(data):'';
      }
     
    })
  }

 
  onPostClick(postData:any) {
    this.router.navigate(['/content/postAnswer', { post_id: postData.post_id,description:postData.description,title:postData.title,solution:postData.solution}]);
  }

  backButtonClicked() {
    this.location.back();
  }


}
