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
      userID : this.activatedRoute.snapshot.paramMap.get('user_id')
    }
  }

}
