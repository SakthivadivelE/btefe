import { Component, OnInit } from '@angular/core';
import { DataService } from'../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topicshome',
  templateUrl: './topicshome.component.html',
  styleUrls: ['./topicshome.component.css'],
  providers:[]
})
export class TopicshomeComponent implements OnInit {
public topics:any;
  constructor(private dataService:DataService,private router:Router) { }

  ngOnInit() {
    this.dataService.getTopics()
    .subscribe(data => {
      this.topics=data;
    });
  }

  // onTopicClick(topic:any) {
  //   this.router.navigate(['/postlist', { topic_id:topic.topic_id, title: topic.title}]);
  // }

}
