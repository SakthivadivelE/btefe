import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-contentarea',
  templateUrl: './contentarea.component.html',
  styleUrls: ['./contentarea.component.css']
})
export class ContentareaComponent implements OnInit {
  public userData:any;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.userData = {
      username : this.activatedRoute.snapshot.paramMap.get('user_name'),
      isAdmin : this.activatedRoute.snapshot.paramMap.get('isAdmin'),
      userID : this.activatedRoute.snapshot.paramMap.get('user_id'),
      empID:this.activatedRoute.snapshot.paramMap.get('empID'),
      notify:this.activatedRoute.snapshot.paramMap.get('notify'),
      email:this.activatedRoute.snapshot.paramMap.get('email'),
      interest:this.activatedRoute.snapshot.paramMap.get('interest'),
    }
  }

 

}
