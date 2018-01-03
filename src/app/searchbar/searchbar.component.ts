import { Component, OnInit,Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers:[]
})
export class SearchbarComponent implements OnInit {
@Input() topicData;
  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButtonClicked() {
    this.location.back();
  }
}
