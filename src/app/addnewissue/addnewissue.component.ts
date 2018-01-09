import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import {Popup} from 'ng2-opd-popup';
import { TestService } from '../services/test.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addnewissue',
  templateUrl: './addnewissue.component.html',
  styleUrls: ['./addnewissue.component.css'],
  providers:[Popup]
})
export class AddnewissueComponent implements OnInit {
  public topics:any;
  public selectedTopic:string;
  public changeTopic:boolean=false;
  public postValue:any;
  public postCreated:boolean=false;
  public duplicateTitle:boolean=false;
public topicData:any;

@ViewChild('popup1') popup1: Popup;

  constructor(private location:Location,private dataService:DataService,private activatedRoute:ActivatedRoute) { 
   
  }

  ngOnInit() {

    this.topicData = {
      topic_id : this.activatedRoute.snapshot.paramMap.get('topic_id'),
      topic_title : this.activatedRoute.snapshot.paramMap.get('title'),
      
    }

    this.dataService.getTopics()
    .subscribe(data=>{
     this.topics=data;
     this.selectedTopic=this.topicData.topic_title;
    });
  }

  onNewIssueSubmit(value:any) {
    this.postValue=value;
    this.showPopup();
  }

  showPopup(){
        this.popup1.options = {
          header: "Are you sure to post into this topic?",
          color: "green", 
          widthProsentage: 30,  
          animationDuration: 0.5, 
          showButtons: false, 
          confirmBtnContent: "Yes",  
          cancleBtnContent: "Change",
          confirmBtnClass: "btn btn-default", 
          cancleBtnClass: "btn btn-default", 
          animation: "fadeInDown" 
      };
       
        this.popup1.show(this.popup1.options);
      }
    
      closePopup() {
        this.popup1.hide();
      }

      onYesButtonClick() {
        this.dataService.getUserData()
        var postData= {
          title:this.postValue.heading,
          description:this.postValue.description,
          topic_id:typeof this.postValue.topic !== undefined &&  typeof this.postValue.topic !== 'undefined'? this.postValue.topic:this.topicData.topic_id,
          user_id:localStorage.getItem('user_id'),
          solution:this.postValue.solution
        }
      
       this.closePopup();
       this.changeTopic=false;
       this.dataService.createPost(postData)
       .subscribe(data=>{
        if (data.status == 200) {
         this.postCreated = true;
         setTimeout(()=>{   
          this.postCreated = false;
          this.location.back();
     },3000);
        } else {
         this.duplicateTitle=true;
         setTimeout(()=>{   
          this.duplicateTitle=false;
     },2000);
        }
       },err=>{
         console.error(err);
       }
      );
      }

      onChangeButtonClick() {
        this.closePopup();
        this.changeTopic=true;
      }

      backButtonClicked() {
        this.location.back();
    }
}
