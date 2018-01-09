import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import {Popup} from 'ng2-opd-popup';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css'],
  providers:[Popup]
})
export class ManageusersComponent implements OnInit {
public users:any=[];
public user:any={};
public searchText:string;
public totalUsers :number;

@ViewChild('popup1') popup1: Popup;

  constructor(private dataService:DataService,private location:Location,private router:Router) { }

  ngOnInit() {
    this.dataService.listUsers()
    .subscribe(data=>{
      this.users = data;
      this.totalUsers = this.users.length;
    });
  }


  onRemoveUserClick(user:any) {
    this.showPopup(user);
    this.user = user;
  }

  showPopup(user:any){
    this.popup1.options = {
      header:` Are you sure to remove user ${user.username}?`,
      color: "green", 
      widthProsentage: 40,  
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
    this.closePopup();
    var data = {
      user_id : this.user.user_id
    }
    this.dataService.removeUser(data)
    .subscribe(data =>{
      console.error(data);
    }); 
  
  }

  onCancelButtonClick() {
    this.closePopup();
  }

  onAddUserClick() {
   this.router.navigate(['/content/addnewuser']);
  }

  onSearchButtonClick() {
    var data = {
       name : this.searchText
    };
    this.dataService.searchUsers(data)
    .subscribe(data=>{
        this.users = data;
    });
  }

  backButtonClicked() {
    this.location.back();
  }

  onUserClick(user) {
   this.router.navigate(['/content/adminuserview',{ user_id: user.user_id,title:user.username}]);
  }

}
