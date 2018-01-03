import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-approveissue',
  templateUrl: './approveissue.component.html',
  styleUrls: ['./approveissue.component.css']
})
export class ApproveissueComponent implements OnInit {

  public postData :any = { };
  public postApproved: boolean = false;

  constructor(private activatedRoute:ActivatedRoute,private dataService:DataService,private location:Location,private router:Router) { }

  ngOnInit() {

     
    this.postData = {
      post_id:this.activatedRoute.snapshot.paramMap.get('post_id'),
      title:this.activatedRoute.snapshot.paramMap.get('title'),
      description:this.activatedRoute.snapshot.paramMap.get('description'),
      solution:this.activatedRoute.snapshot.paramMap.get('solution'),
      topic_id:this.activatedRoute.snapshot.paramMap.get('topic_id'),
    }

  }

  onAcceptClick() {
   var data= {
     post_id:this.postData.post_id,
     topic_id:this.postData.topic_id
   }

   this.dataService.approvePost(data)
   .subscribe(data=>{
     this.postApproved = true;
     setTimeout(()=>{
      this.postApproved = false;
      this.location.back();
     },2000);
    
   });
  }

  onRejectClick() {
    this.router.navigate(['/content/rejectPost', { post_id:this.postData.post_id}]);
  }

}
