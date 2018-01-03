import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-viewpostanswer',
  templateUrl: './viewpostanswer.component.html',
  styleUrls: ['./viewpostanswer.component.css']
})
export class ViewpostanswerComponent implements OnInit {
public postAnswers:any;
public answerAdded:boolean=false;
public answerValue:any="";

public postData:any;
  constructor(private activatedRoute:ActivatedRoute, private dataService:DataService) { }

  ngOnInit() {

   
    this.postData = {
      post_id:this.activatedRoute.snapshot.paramMap.get('post_id'),
      title:this.activatedRoute.snapshot.paramMap.get('title'),
      description:this.activatedRoute.snapshot.paramMap.get('description'),
      solution:this.activatedRoute.snapshot.paramMap.get('solution'),
    }

    this.dataService.getPostAnswers({post_id:this.postData.post_id})
    .subscribe(data=>{
     this.postAnswers=data;
     console.error(this.postAnswers);
    });
  }

  onAnswerSubmit(value:any) {
    var data = {
      description :value.answer,
      post_id:this.postData.post_id,
      user_id:localStorage.getItem('user_id')
    };

  this.dataService.addAnswer(data)
  .subscribe(data=>{
   this.answerAdded = true;
   setTimeout(()=>{
    this.answerAdded = false;
    this.answerValue = '';
   },2000);
  });
  }

}
