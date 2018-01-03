import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-rejectpost',
  templateUrl: './rejectpost.component.html',
  styleUrls: ['./rejectpost.component.css']
})
export class RejectpostComponent implements OnInit {
public postData:any={};
public reasontoReject : string ;
public postRejected:boolean = false;
  constructor(private activatedRoute:ActivatedRoute,private location:Location, private dataService:DataService) { }

  ngOnInit() {

    this.postData = {
      post_id:this.activatedRoute.snapshot.paramMap.get('post_id'),
    }
  }

  onCancelClick() {
      this.location.back();
  }

  onRejectClick() {
    var data = {
      post_id:this.postData.post_id,
      reason:this.reasontoReject
    }

    this.dataService.rejectPost(data)
    .subscribe(data=> {
     this.postRejected = true;
     setTimeout(()=>{
      this.postRejected = false ;
      this.location.back();
      this.location.back();
     },2000);
    });
  }
}
